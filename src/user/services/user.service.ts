import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { AxiosRequestConfig } from 'axios';
import { UserSearchOptions } from 'src/utils/types/user-search-options.type';
import { UserProfile } from 'src/utils/types/user-profile.type';

@Injectable()
export class UserService {
  constructor(private readonly httpService: AxiosHttpService ) {}

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
}
