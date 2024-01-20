import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { LoginResponse } from 'src/utils/types/login-reponse.type';
import { LoginRequest } from 'src/utils/types/login-request.type';
import { AxiosRequestConfig } from 'axios';
import { IntrospectRequest } from 'src/utils/types/introspect.type';
import { UserService } from 'src/user/services/user.service';
import { ActionEmail } from 'src/utils/enums/action-email.enum';

@Injectable()
export class AuthService {
  private user: LoginRequest = {} as LoginRequest;

  constructor(
    private readonly httpService: AxiosHttpService,
    private readonly userService: UserService,
  ) {
    this.user.client_id = process.env.CLIENT_ID;
    this.user.client_secret = process.env.SECRET;
    this.user.grant_type = 'password';
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    this.user.username = username;
    this.user.password = password;
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const { access_token, expires_in, refresh_token, refresh_expires_in } =
      await this.httpService.post(
        `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`,
        'Login',
        new URLSearchParams(this.user),
        headersRequest,
      );

    return {
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    } as LoginResponse;
  }

  async introspect(accessToken: string): Promise<any> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const introspectToken = {} as IntrospectRequest;
    introspectToken.client_id = this.user.client_id;
    introspectToken.client_secret = this.user.client_secret;
    introspectToken.token = accessToken;

    const data = this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/token/introspect`,
      'Introspect',
      new URLSearchParams(introspectToken),
      headersRequest,
    );

    return data;
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`,
      'Refresh Token',
      new URLSearchParams({
        client_id: this.user.client_id,
        client_secret: this.user.client_secret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      headersRequest,
    );

    return data;
  }

  async logout(refreshToken: string) {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/logout`,
      'Logout',
      new URLSearchParams({
        client_id: this.user.client_id,
        client_secret: this.user.client_secret,
        refresh_token: refreshToken,
      }),
      headersRequest,
    );
    return data;
  }

  async revoke(access_token: string) {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/revoke`,
      'Revoke',
      new URLSearchParams({
        client_id: this.user.client_id,
        client_secret: this.user.client_secret,
        token: access_token,
        token_type_hint: 'access_token',
      }),
      headersRequest,
    );
    return data;
  }

  async recoveryPassword(email: string, lifespan: number): Promise<any> {
    const { access_token } = await this.login(
      process.env.USER_ADMIN,
      process.env.PASSWORD_ADMIN,
    );

    const users = await this.userService.getAll(`Bearer ${access_token}`, {
      email,
    });
    if (users.length == 0) throw new NotFoundException();

    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { client_id: this.user.client_id, lifespan },
    };

    const test = String(ActionEmail.UPDATE_PASSWORD);

    const data = await this.httpService.put(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${users[0].id}/execute-actions-email`,
      'Recovery Password',
      [test],
      headersRequest,
    );

    this.revoke(access_token);

    return data;
  }
}
