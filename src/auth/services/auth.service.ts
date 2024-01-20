import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { LoginResponse } from 'src/utils/types/login-reponse.type';
import { LoginRequest } from 'src/utils/types/login-request.type';
import { AxiosRequestConfig } from 'axios';
import { UserInfoResponse } from 'src/utils/types/user-info-response.type';
import { IntrospectRequest } from 'src/utils/types/introspect.type';

@Injectable()
export class AuthService {
  private user: LoginRequest = {} as LoginRequest;

  constructor(private readonly httpService: AxiosHttpService) {
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

  async reset_password(accessToken: string): Promise<any> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${accessToken}`,
      },
    };
    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`,
      'Refresh Token',
      new URLSearchParams({
        client_id: this.user.client_id,
        client_secret: this.user.client_secret,
        grant_type: 'refresh_token',
        refresh_token: accessToken,
      }),
      headersRequest,
    );

    return data;
  }
}
