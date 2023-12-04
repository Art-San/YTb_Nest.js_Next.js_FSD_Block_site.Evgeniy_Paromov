import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { AddBlockItemDto, BlockListQueryDto } from './dto/block-list.dto'

@Injectable()
export class BlockListService {
	constructor(private db: DbService) {}

	create(userId: number) {
		return this.db.blockList.create({
			data: {
				ownerId: userId,
			},
		})
	}

	getByUser(userId: number, query: BlockListQueryDto) {
		return this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId },
			include: {
				//include что бы подгружались связи
				items: {
					where: { data: { contains: query.q, mode: 'insensitive' } }, //insensitive что бы не учитывался регистр
					orderBy: { createdAt: 'desc' },
				},
			},
		})
	}
	// 1:54:00

	async addItem(userId: number, data: AddBlockItemDto) {
		const blockList = await this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId },
		})

		return this.db.blockItem.create({
			data: { blockListId: blockList.id, ...data },
		})
	}

	async removeItem(userId: number, itemId: number) {
		const blockList = await this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId },
		})
		// Удаляем только свои blockItem
		return this.db.blockItem.delete({
			where: {
				blockListId: blockList.id,
				id: itemId,
			},
		})
	}
}