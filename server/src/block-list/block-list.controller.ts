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
import { BlockListService } from './block-list.service'
import {
	AddBlockItemDto,
	BlockItemDto,
	BlockListDto,
	BlockListQueryDto,
} from './dto/block-list.dto'

@Controller('block-list')
@UseGuards(AuthGuard) // теперь внутри методов будут доступны сессии
export class BlockListController {
	constructor(private blockListService: BlockListService) {}
	@Get()
	@ApiOkResponse({
		type: BlockListDto, // указывает, что при успешном выполнении запроса к этому методу контроллера будет возвращен объект типа BlockListDto в формате JSON.
	})
	getList(
		@Query() query: BlockListQueryDto,
		@SessionInfo() session: GetSessionInfoDto
	): Promise<BlockListDto> {
		return this.blockListService.getByUser(session.id, query)
	}

	@Post('item')
	@ApiOkResponse({
		type: BlockItemDto,
	})
	addBlockItem(
		@Body() body: AddBlockItemDto,
		@SessionInfo() session: GetSessionInfoDto
	): Promise<BlockItemDto> {
		return this.blockListService.addItem(session.id, body)
	}

	@Delete('item/:id')
	@ApiOkResponse({
		type: BlockItemDto,
	})
	async removeBlockItem(
		@Param('id', ParseIntPipe) id: number, //в Param айди приходит строкой, ParseIntPipe переводит в число
		@SessionInfo() session: GetSessionInfoDto
	) {
		return await this.blockListService.removeItem(session.id, id)
	}
}
