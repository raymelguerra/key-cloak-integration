import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { ActionEmail } from 'src/utils/enums/action-email.enum';
import { AxiosRequestConfig } from 'axios';
import { EmailSearchOption } from 'src/utils/types/email-search-option.type';

@Injectable()
export class KeycloakEmailService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async sendEmail(
    token: string,
    user_id: string,
    actions: ActionEmail[],
    query: EmailSearchOption,
  ): Promise<any> {
    const headersEmailRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
      params: { client_id: process.env.CLIENT_ID, ...query },
    };
    const data = await this.httpService.put(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/execute-actions-email`,
      'Recovery and Verify Password',
      actions,
      headersEmailRequest,
    );
    return data;
  }
}
