import { Body, Controller, Get, Patch } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { AccountDto, PatchAccountDto } from './dto/account.dto'

@Controller('account')
export class AccountController {
	@Get()
	@ApiOkResponse({
		type: AccountDto,
	})
	getAccount() {}

	@Patch()
	@ApiOkResponse({
		type: AccountDto,
	})
	patchAccount(@Body() body: PatchAccountDto) {}
}
// 1:28:24
