import {
    ApiProperty,
} from "@nestjs/swagger";
import {
    IsNotEmpty,
} from "class-validator";

export class RecordsResponseDto  {
    @ApiProperty({
        example: 'uuid',
        description:'userId',
        required: true,
    })
    @IsNotEmpty()
    'userId': string;
}
