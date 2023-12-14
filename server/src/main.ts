// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder().setTitle('Block List').build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)

	app.use(cookieParser())
	app.enableCors({
		origin: [
			'http://localhost:3001', // разрешаем отсюда делать запросы
			'chrome-extension://hkhnfcffjgcnpijkbcnhkakdnbekkkea',
		],
		credentials: true,
	})
	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())
	await app.listen(3000)
}
bootstrap()
