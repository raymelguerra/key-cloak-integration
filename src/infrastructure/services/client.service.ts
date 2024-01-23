import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { AxiosRequestConfig } from 'axios';
import { ClientSearchOptions } from 'src/utils/types/client-search-options.type';

@Injectable()
export class ClientService {
    
    constructor(private readonly httpService: AxiosHttpService) {}

    async getAll(
        token: string,
        query: ClientSearchOptions,
      ): Promise<any[]> {
        const headersRequest: AxiosRequestConfig = {
          headers: {
            Authorization: `${token}`,
          },
          params: query,
        };
        const data = await this.httpService.get(
          `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/clients`,
          'Get All Client',
          headersRequest,
        );
        return data;
      }
}
