import {
    IsNotEmpty, 
} from 'class-validator';

export class CreateRecordsDto {
	@IsNotEmpty()
	'title': string;

	@IsNotEmpty()
	'location': string;

	@IsNotEmpty()
	'startTime': string;

	@IsNotEmpty()
	'endTime': string;

	@IsNotEmpty()
	'createdAt': Date;

	@IsNotEmpty()
	'content': string;

	@IsNotEmpty()
	'userId': string;
}
