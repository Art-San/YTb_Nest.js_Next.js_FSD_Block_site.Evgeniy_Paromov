import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { async } from 'rxjs'
import { UsersService } from 'src/users/users.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private passwordService: PasswordService,
		private jwtService: JwtService
	) {}

	async signUp(email: string, password: string) {
		const user = await this.userService.findByEmail(email)
		if (user) {
			throw new BadRequestException({ type: 'email-exists-существует' })
		}
		const salt = this.passwordService.getSalt()
		const hash = this.passwordService.getHash(password, salt)

		const newUser = await this.userService.create(email, hash, salt)

		const accessToken = await this.jwtService.signAsync({
			id: newUser.id,
			email: newUser.email,
		})

		// 1:00:00

		return { accessToken }
	}

	async signIn(email: string, password: string) {
		const user = await this.userService.findByEmail(email)
		if (!user) {
			throw new UnauthorizedException({ type: 'email-нет такого' })
			// throw new UnauthorizedException()
		}

		const hash = this.passwordService.getHash(password, user.salt)

		if (hash !== user.hash) {
			throw new UnauthorizedException({ message: 'пароль не верный' })
			// throw new UnauthorizedException()
		}

		const accessToken = await this.jwtService.signAsync({
			id: user.id,
			email: user.email,
		})

		// 1:11:05

		return { accessToken }
	}
}
