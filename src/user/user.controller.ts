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
  Put,
  Patch,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserProfile } from 'src/utils/types/user-profile.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Request() req: Request, @Body() body: UserProfile) {
    const { authorization } = req.headers as any;
    return this.userService.create(authorization, body);
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
}
