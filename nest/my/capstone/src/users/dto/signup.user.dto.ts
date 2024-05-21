import {
    IsEmail, IsNotEmpty, Length, Matches, 
} from 'class-validator';

export class SignupUserDto {
	@IsNotEmpty()
	@IsEmail()
	@Length(1, 50)
	'email': string;

	@IsNotEmpty()
	@Length(8, 20)
	@Matches(
	    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~․!@#$%^&*()_\-+=\[\]|\\;:‘“<>,.?/])[A-Za-z\d~․!@#$%^&*()_\-+=\[\]|\\;:‘“<>,.?/]{8,20}$/
	)
	'password': string;

	@IsNotEmpty()
	@Length(1, 10)
	@Matches(/^[a-zA-Z0-9가-힣]+$/, {
	    message: '닉네임에는 특수문자가 포함될 수 없습니다.', 
	})
	'nickname': string;
}
