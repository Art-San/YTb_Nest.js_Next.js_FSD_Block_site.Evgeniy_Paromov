import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetSessionInfoDto } from 'src/auth/dto/auth.dto'
import { SessionInfo } from 'src/auth/session-info.decorator'
import {
	AddBlockItemDto,
	BlockItemDto,
	BlockListDto,
	BlockListQueryDto,
} from './dto/block-list.dto'

@Controller('block-list')
@UseGuards(AuthGuard) // теперь внутри методов будут доступны сессии
export class BlockListController {
	@Get()
	@ApiOkResponse({
		type: BlockListDto, // указывает, что при успешном выполнении запроса к этому методу контроллера будет возвращен объект типа BlockListDto в формате JSON.
	})
	getList(
		@Query() query: BlockListQueryDto,
		@SessionInfo() session: GetSessionInfoDto
	) {}

	@Post('item')
	@ApiOkResponse({
		type: BlockItemDto,
	})
	addBlockItem(
		@Body() body: AddBlockItemDto,
		@SessionInfo() session: GetSessionInfoDto
	) {}

	@Delete('item/:id')
	@ApiOkResponse()
	removeBlockItem(
		@Param(ParseIntPipe) id: number,
		@SessionInfo() session: GetSessionInfoDto
	) {
		//в Param айди приходит строкой, ParseIntPipe переводит в число
	}
}
