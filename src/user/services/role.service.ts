import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/config/services/axios-http.service';
import { AxiosRequestConfig } from 'axios';
import { RoleSearchOptions } from 'src/utils/types/role-search-options.type';
import { RoleRepresentation } from 'src/utils/types/role.type';

@Injectable()
export class RoleService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async getAllRoles(token: string, query: RoleSearchOptions): Promise<any[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
      params: query,
    };
    const data = await this.httpService.get(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/roles`,
      'Get All Roles',
      headersRequest,
    );
    return data;
  }

  async getRoleByName(
    token: string,
    role_name: string,
  ): Promise<RoleRepresentation> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const data = await this.httpService.get(
      // `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/role-mappings/realm`,
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/roles/${role_name}`,
      'Get Role By Name',
      headersRequest,
    );
    return data;
  }

  async removeRole(
    token: string,
    role_name: string,
    user_id: string,
  ): Promise<string> {

    const rol = await this.getRoleByName(token, role_name);

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/role-mappings/realm`,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyREl5R1RtRUN3ZVdhRV9zVTJ1MS1YcFJzVm84WVpmaFdONFJwQnI0R0pnIn0.eyJleHAiOjE3MDYwNDk2NzIsImlhdCI6MTcwNjA0Nzg3MiwianRpIjoiZjliYTBhMGItYTFhYy00Mjg3LThhOGMtYjY1YWQyZTA5MDNhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9hcGlfbmVzdGpzIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJicm9rZXIiLCJhY2NvdW50Il0sInN1YiI6ImEwNzA0YmZjLWRhOTYtNDhiMC1iN2FhLWU1YWY1ZWMxMDA5MSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1uZXN0LWFwcCIsInNlc3Npb25fc3RhdGUiOiIxZjZkMDVmMy1lZWRjLTRlZjAtYTY4Zi0zMDMzYTg3Nzc0YTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NsYWhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYXBpX25lc3RqcyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LWFwcGxpY2F0aW9ucyIsInZpZXctY29uc2VudCIsInZpZXctZ3JvdXBzIiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJkZWxldGUtYWNjb3VudCIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19LCJhcGktbmVzdC1hcHAiOnsicm9sZXMiOlsiYWRtaW5pc3RyYXRvciIsInVtYV9wcm90ZWN0aW9uIiwib3BlcmF0b3IiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxZjZkMDVmMy1lZWRjLTRlZjAtYTY4Zi0zMDMzYTg3Nzc0YTAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlJheW1lbCBSYW1vcyBHdWVycmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbmlzdHJhdG9yIiwiZ2l2ZW5fbmFtZSI6IlJheW1lbCIsImZhbWlseV9uYW1lIjoiUmFtb3MgR3VlcnJhIiwiZW1haWwiOiJyYXltZWxndWVycmFAZ21haWwuY29tIn0.Hh7Dj2MOtqTjafw_Gjk1wOHXJJqu9OKYyxPlMG30r__3cC_lZwb8TeKx9jxQcT77m8zn1hrV-yVwt_kGhGHn16D-fqAXJ6I_tN8ZjSiq0ny9TetiMzEDePIX7ptqeYRQOcdcote1gYEUhE9Lk9zuKq--PPQmc_dIl1wAyz_cgszIeWPbWP438UatKhdPoSjhjRPjn6mGl6u3v5-s8z09U5UUPkkdjXTCmqMSXy1JxFkT7b8jy9y-nXyqGpsUITPkSHMTW3SfafOk_c1Q4eLD2AblMQtoBvNmJuGPCNtvrVkDzZmDWn7h3YAIVcz01dDrIRpaD0JKh8LKo6X6__CYRA',
        'content-type': 'application/json',
      },
      data: [rol],
    };

    const data = await this.httpService.specialMethod('Remove Role', config);

    return data;
  }

  async addRole(
    token: string,
    role_name: string,
    user_id: string,
  ): Promise<any[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    };

    const rol = await this.getRoleByName(token, role_name);

    const data = await this.httpService.post(
      `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/role-mappings/realm`,
      'Remove Roles To User',
      [rol],
      headersRequest,
    );
    return data;
  }
}

// verify mapping roles of user `${process.env.AUTH_SERVER_URL}/admin/realms/${process.env.REALM}/users/${user_id}/role-mappings/realm`,
//  /admin/realms/{realm}/users/{id}/role-mappings/clients/{client}
// /admin/realms/{realm}/users/{id}/role-mappings/realm
// GET /admin/realms/{realm}/users/{id}/role-mappings

// GEt all /admin/realms/{realm}/roles
