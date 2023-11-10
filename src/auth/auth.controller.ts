import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { UsersModel } from 'src/users/entity/users.entity';
import { User } from 'src/users/decorator/users.decorator';
import { Token } from './decorator/token.decorator';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  posctTokenAccess(@Token() refreshToken: string) {
    const newToken = this.authService.rotateToken(refreshToken, false);

    return { accessToken: newToken };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Token() refreshToken: string) {
    const newToken = this.authService.rotateToken(refreshToken, true);

    return { refreshToken: newToken };
  }

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  postLoginEmail(@User() user: UsersModel) {
    return this.authService.loginUser(user);
  }

  @Post('register/email')
  @IsPublic()
  postRegisterEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }
}
