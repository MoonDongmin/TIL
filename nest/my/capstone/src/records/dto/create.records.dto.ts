import {
    IsNotEmpty, 
} from 'class-validator';

export class CreateRecordsDto {
	@IsNotEmpty()
	'title': string;

	@IsNotEmpty()
	'state': string;

	@IsNotEmpty()
	'country': string;

	@IsNotEmpty()
	'start_time': string;

	@IsNotEmpty()
	'end_time': string;

	@IsNotEmpty()
	'created_at': Date;

	@IsNotEmpty()
	'content': string;

	@IsNotEmpty()
	'user_id': string;
}
