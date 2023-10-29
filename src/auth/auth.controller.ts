import { Controller, Get, HttpCode, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
	@Post('sign-up')
	@HttpCode(200)
	signUp() {}

	@Post('sign-in')
	@HttpCode(200)
	signIn() {}

	@Post('sign-out')
	@HttpCode(200)
	signOut() {}

	@Get('session')
	getSessionInfo() {}
}
