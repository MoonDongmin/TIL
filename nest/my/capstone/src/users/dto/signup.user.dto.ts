import {
    IsNotEmpty,
} from 'class-validator';

export class SignupUserDto {
	@IsNotEmpty()
	'email': string;

	@IsNotEmpty()
	'password': string;

	@IsNotEmpty()
	'nickname': string;
}
