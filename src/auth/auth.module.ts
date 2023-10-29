import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { CookieService } from './cookie.service'

import { PasswordService } from './password.service'

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [AuthService, PasswordService, CookieService]
})
export class AuthModule {}
