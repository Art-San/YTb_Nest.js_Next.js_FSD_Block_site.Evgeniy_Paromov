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

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder().setTitle('Block List').build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
	await app.listen(3000)
}
bootstrap()
