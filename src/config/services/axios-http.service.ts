import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosHttpService {
  constructor(private readonly httpService: HttpService) {}

  async post(url: string, code?: string, hhtpData?: any, config?) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url, hhtpData, config),
      );
      return data;
    } catch (error) {
      this.sendError(error, code);
    }
  }

  async get(url: string, code?: string, config?) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(url, config));
      return data;
    } catch (error) {
      this.sendError(error, code);
    }
  }

  async delete(url: string, code?: string, config?) {
    ``;
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(url, config),
      );
      return data;
    } catch (error) {
      this.sendError(error, code);
    }
  }

  async patch(url: string, code?: string, hhtpData?: any, config?) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(url, hhtpData, config),
      );
      return data;
    } catch (error) {
      this.sendError(error, code);
    }
  }

  async put(url: string, code?: string, hhtpData?: any, config?) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(url, hhtpData, config),
      );
      return data;
    } catch (error) {
      this.sendError(error, code);
    }
  }

  private sendError(error, code) {
    let httpError = 500;
    let errors: any = {
      errors: error,
    };
    if (error.response) {
      const { data, status, statusText } = error.response;
      if (error.response.status) httpError = error.response.status;

      const d = new Date();
      const dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
      errors = {
        method: code,
        data,
        statusCode: status,
        statusText,
        timestamp: dformat,
      };
    }
    throw new HttpException(errors, httpError);
  }
}
