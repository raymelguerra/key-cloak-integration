import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { AxiosRequestConfig } from 'axios';
import { UserSearchOptions } from 'src/utils/types/user-search-options.type';
import { UserProfile } from 'src/utils/types/user-profile.type';
import { ActionEmail } from 'src/utils/enums/action-email.enum';
import { RoleSearchOptions } from 'src/utils/types/role-search-options.type';
import { ClientService } from 'src/infrastructure/services/client.service';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: AxiosHttpService,
    private readonly clientService: ClientService,
  ) {}

  async getAll(
    token: string,
    query: UserSearchOptions,
  ): Promise<UserProfile[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
      params: query,
    };
    const data = await this.httpService.get(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users`,
      'Get All User',
      headersRequest,
    );
    return data;
  }

  async getById(token: string, user_id: string): Promise<UserProfile> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = await this.httpService.get(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}`,
      'Get By Id User',
      headersRequest,
    );
    return data;
  }

  async create(token: string, body: UserProfile): Promise<UserProfile[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users `,
      'Create User',
      body,
      headersRequest,
    );

    let users = await this.getAll(token, { email: body.email });
    let user_id = users[0].id;

    const headersEmailRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
      params: { client_id: process.env.CLIENT_ID, lifespan: 86400 },
    };

    this.httpService.put(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/execute-actions-email`,
      'Recovery and Verify Password',
      [ActionEmail.VERIFY_EMAIL, ActionEmail.UPDATE_PASSWORD],
      headersEmailRequest,
    );

    return data;
  }

  async delete(token: string, user_id: string): Promise<UserProfile[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = await this.httpService.delete(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}`,
      'Delete User',
      headersRequest,
    );
    return data;
  }

  async update(
    token: string,
    user_id: string,
    body: UserProfile,
  ): Promise<UserProfile[]> {
    const old_user = await this.getById(token, user_id);
    if (body.email && old_user.email !== body.email) {
    }
    if (body.username && old_user.email !== body.username) {
      const d = new Date();
      const dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
      let errors = {
        method: 'Update User',
        data: [
          {
            field: 'username',
            validations: ['The username field cannot be changed'],
          },
        ],
        statusCode: HttpStatus.FORBIDDEN,
        statusText: 'Forbidden error',
        timestamp: dformat,
      };
      throw new ForbiddenException(errors, '');
    }

    const merged = { ...old_user, ...body };

    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = await this.httpService.put(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}`,
      'Update User',
      merged,
      headersRequest,
    );
    return data;
  }

}

//GET /admin/realms/{realm}/users/{id}/role-mappings/clients/{client}
