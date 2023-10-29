import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { AppService } from './app.service'
import { DbService } from './db/db.service'

// import { PrismaClient } from '@prisma/client' --- вместо этого создали папку дб с файлами
// const prisma = new PrismaClient()

class HelloWorldDto {
	@ApiProperty()
	message: string
}

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly dbService: DbService
	) {}

	@Get()
	@ApiOkResponse({
		type: HelloWorldDto
	})
	async getHello(): Promise<HelloWorldDto> {
		const user = await this.dbService.user.findMany()
		console.log('user', user)
		return { message: this.appService.getHello() }
	}
}

// 26:2
