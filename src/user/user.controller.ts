import {
  Controller,
  Get,
  Request,
  Query,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserProfile } from 'src/utils/types/user-profile.type';
import { RoleService } from './services/role.service';
import { EmailSearchOption } from 'src/utils/types/email-search-option.type';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Get('')
  getAll(@Request() req: Request, @Query() query: any) {
    const { authorization } = req.headers as any;

    return this.userService.getAll(authorization, query);
  }

  @Get(':user_id')
  getyId(@Request() req: Request, @Param('user_id') user_id: string) {
    const { authorization } = req.headers as any;

    return this.userService.getById(authorization, user_id);
  }

  @Post('')
  create(@Request() req: Request, @Body() body: UserProfile, @Query() query: EmailSearchOption) {
    const { authorization } = req.headers as any;
    return this.userService.create(authorization, body, query);
  }

  @Delete(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() req: Request, @Param('user_id') user_id: string) {
    const { authorization } = req.headers as any;

    return this.userService.delete(authorization, user_id);
  }

  @Patch(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Request() req: Request,
    @Param('user_id') user_id: string,
    @Body() body: UserProfile,
  ) {
    const { authorization } = req.headers as any;

    return this.userService.update(authorization, user_id, body);
  }

  @Get('roles/all')
  getAllRoles(@Request() req: Request, @Query() query: any) {
    const { authorization } = req.headers as any;

    return this.roleService.getAllRoles(authorization, query);
  }

  @Patch('roles/:user_id/add')
  @HttpCode(HttpStatus.NO_CONTENT)
  addRole(
    @Request() req: Request,
    @Body('role_name') role_name: string,
    @Param('user_id') user_id: string,
  ) {
    const { authorization } = req.headers as any;

    return this.roleService.addRole(authorization, role_name, user_id);
  }

  @Patch('roles/:user_id/remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRole(
    @Request() req: Request,
    @Body('role_name') role_name: string,
    @Param('user_id') user_id: string,
  ) {
    const { authorization } = req.headers as any;

    return this.roleService.removeRole(authorization, role_name, user_id);
  }
}
