import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { BlockListQueryDto } from './dto/block-list.dto'

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
		return this.db.blockList.findFirstOrThrow({
			where: { ownerId: userId },
		})
	}
	// 1:54:00

	addItem() {}

	removeItem() {}
}
