import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignUpBodyDto {
	@ApiProperty({
		example: 'test@email.ru',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '12345',
	})
	@IsNotEmpty()
	password: string
}

export class SignInBodyDto {
	@ApiProperty({
		example: 'test@email.ru',
	})
	email: string

	@ApiProperty({
		example: '12345',
	})
	password: string
}

export class GetSessionInfoDto {
	@ApiProperty()
	id: number

	@ApiProperty()
	email: string

	@ApiProperty()
	'iat': number

	@ApiProperty()
	'exp': number
}
