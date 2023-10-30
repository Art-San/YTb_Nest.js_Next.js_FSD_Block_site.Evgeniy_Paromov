import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {} // 1:05:03

	@Post('sign-up')
	@ApiCreatedResponse()
	signUp(@Body() body: SignUpBodyDto) {
		return this.authService.signUp(body.email, body.password)
	}

	@Post('sign-in')
	@ApiOkResponse()
	@HttpCode(200)
	signIn(@Body() body: SignInBodyDto) {
		return null
	}

	@Post('sign-out')
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	signOut() {}

	@Get('session')
	@ApiOkResponse({
		type: GetSessionInfoDto,
	})
	getSessionInfo() {
		return null
	}
}
