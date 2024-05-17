import {
    IsNotEmpty, 
} from 'class-validator';
import {
    ApiProperty, 
} from '@nestjs/swagger';

export class CreateRecordsDto {
	@ApiProperty({
	    example: '플로깅 했어요',
	    description: 'title',
	    required: true,
	})
	@IsNotEmpty()
	'title': string;

	@ApiProperty({
	    example: '경상북도 김천시',
	    description: 'location',
	    required: true,
	})
	@IsNotEmpty()
	'location': string;

	@ApiProperty({
	    example: '2024/04/15-05:36',
	    description: 'startTime',
	    required: true,
	})
	@IsNotEmpty()
	'startTime': string;

	@ApiProperty({
	    example: '2024/04/15-06:33',
	    description: 'endTime',
	    required: true,
	})
	@IsNotEmpty()
	'endTime': string;

	@ApiProperty({
	    example:
			'오늘은 경북 김천시에서 플로깅을 했어요~... 다음에 또 가야지^^',
	    description: 'content',
	    required: true,
	})
	@IsNotEmpty()
	'content': string;

	@ApiProperty({
	    type: 'array',
	    items: {
	        type: 'string',
	        format: 'binary',
	    },
	    example: '[{이미지1.png}, {이미지2.png}]',
	    description: 'image',
	    required: true,
	})
	@IsNotEmpty()
	'image': Express.Multer.File[];
}
