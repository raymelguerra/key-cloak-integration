import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserLogin } from 'src/utils/types/user-login.type';
import {
  Public,
  AuthenticatedUser,
  Roles,
  RoleMatchingMode,
} from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: UserLogin) {
    const { username, password } = body;

    return this.authService.login(username, password);
  }

  @Get('/introspect')
  instrospect(@Request() req: Request) {
    const { authorization } = req.headers as any;
    const [, accessToken] = authorization.split(' ');

    return this.authService.introspect(accessToken);
  }

  @Get('/me')
  getProfile(
    @AuthenticatedUser()
    user: any,
  ): any {
    const {
      email_verified,
      name,
      preferred_username,
      given_name,
      family_name,
      email,
      realm_access,
      sub,
    } = user;
    return {
      email_verified,
      name,
      preferred_username,
      given_name,
      family_name,
      email,
      realm_access,
      user_id: sub
    };
  }

  @Public()
  @Post('/refresh')
  refreshToken(@Request() req: Request) {
    const { authorization } = req.headers as any;
    if (!authorization) new UnauthorizedException();
    const [, refresh] = authorization.split(' ');
    return this.authService.refreshToken(refresh);
  }

  @Public()
  @Post('/logout')
  logout(@Request() req: Request) {
    const { authorization } = req.headers as any;
    const [, refresh] = authorization.split(' ');
    return this.authService.logout(refresh);
  }
}
