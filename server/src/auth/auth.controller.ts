import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto/auth.dto'
import { Response } from 'express'
import { CookieService } from './cookie.service'
import { AuthGuard } from './auth.guard'
import { SessionInfo } from './session-info.decorator'

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private cookieService: CookieService
	) {} // 1:05:03

	@Post('sign-up')
	@ApiCreatedResponse()
	async signUp(
		@Body() body: SignUpBodyDto,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		const { accessToken } = await this.authService.signUp(
			body.email,
			body.password
		)

		this.cookieService.setToken(res, accessToken)
	}

	@Post('sign-in')
	@ApiOkResponse()
	@HttpCode(200)
	async signIn(
		@Body() body: SignInBodyDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken } = await this.authService.signIn(
			body.email,
			body.password
		)

		this.cookieService.setToken(res, accessToken)
	}

	@Post('sign-out')
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	signOut(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res)
	}

	@Get('session')
	@ApiOkResponse({
		type: GetSessionInfoDto,
	})
	@UseGuards(AuthGuard)
	getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
		return session
	}
}