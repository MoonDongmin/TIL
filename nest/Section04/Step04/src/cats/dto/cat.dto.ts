import {ApiProperty, PickType} from "@nestjs/swagger";
import {Cat} from "../cats.schema";

// 여기서는 Cat 클래스에서 비밀번호가 있어서 없애 줘야함
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example: '3280199',
        description: 'id',
        required: true,
    })
    id: string;
}