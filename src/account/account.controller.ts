import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetSessionInfoDto } from 'src/auth/dto/auth.dto'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { AccountService } from './account.service'
import { AccountDto, PatchAccountDto } from './dto/account.dto'

@Controller('account')
@UseGuards(AuthGuard) // AuthGuard Проверяет сессию, из токена записывает информацию о текущем юзере в res
export class AccountController {
	constructor(private accountService: AccountService) {}
	@Get()
	@ApiOkResponse({
		type: AccountDto,
	})
	getAccount(@SessionInfo() session: GetSessionInfoDto): Promise<AccountDto> {
		// для строгой типизации, пометили типы возвращаемых значений
		return this.accountService.getAccount(session.id)
	}

	@Patch() //Patch что бы можно было частично редактировать
	@ApiOkResponse({
		type: AccountDto,
	})
	patchAccount(
		@Body() body: PatchAccountDto,
		@SessionInfo() session: GetSessionInfoDto
	): Promise<AccountDto> {
		return this.accountService.patchAccount(session.id, body)
	}
}
// 1:28:24
