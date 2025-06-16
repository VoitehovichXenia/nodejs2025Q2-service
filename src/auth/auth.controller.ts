import {
  Body,
  Controller,
  forwardRef,
  HttpCode,
  Inject,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ContentTypeGuard } from 'src/common/guards/contentType.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, TokenData } from './auth.const';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(ContentTypeGuard)
  @Post('signup')
  signup(@Body() signupDto: LoginDto) {
    return this.userService.create(signupDto);
  }

  @UseGuards(ContentTypeGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<TokenData> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body() refreshDto: RefreshDto) {
    if (!refreshDto || !refreshDto.refreshToken)
      throw new UnauthorizedException('Refresh token should be provided');
    return await this.authService.refresh(refreshDto);
  }
}
