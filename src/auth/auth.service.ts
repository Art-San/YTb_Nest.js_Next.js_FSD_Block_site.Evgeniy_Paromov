import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private passwordService: PasswordService
	) {}

	async signUp(email: string, password: string) {
		const user = await this.userService.findByEmail(email)
		if (user) {
			throw new BadRequestException({ type: 'email-exists' })
		}
		const salt = this.passwordService.getSalt()
		const hash = this.passwordService.getHash(password, salt)

		const newUser = await this.userService.create(email, hash, salt)

		// 1:00:00

		return null
	}

	signIn(email: string, password: string) {}
}
