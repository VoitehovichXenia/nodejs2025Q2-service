import {
  Body,
  Controller,
  forwardRef,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContentTypeGuard } from 'src/common/guards/contentType.guard';
import { CreateUserDto } from 'src/user/user.const';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { TokenData } from './auth.const';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(ContentTypeGuard)
  @Post('signup')
  @HttpCode(201)
  signup(@Body() signupUserDto: CreateUserDto) {
    return this.userService.create(signupUserDto);
  }

  @UseGuards(ContentTypeGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: CreateUserDto): Promise<TokenData> {
    return await this.authService.login(loginUserDto);
  }

  @Post('/refresh')
  refresh() {
    // TODO
    throw new NotFoundException();
  }
}
