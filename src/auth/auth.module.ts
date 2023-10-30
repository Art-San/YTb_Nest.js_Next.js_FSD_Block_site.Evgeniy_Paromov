import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { PasswordService } from './password.service'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: '1d' },
			// secret: process.env.JWT_SECRET
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, PasswordService, CookieService],
})
export class AuthModule {}

// 1:20:00
