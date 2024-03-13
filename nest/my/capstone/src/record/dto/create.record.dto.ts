import {IsNotEmpty} from "class-validator";

export class CreateRecordDto {
    @IsNotEmpty()
    "title": string;

    @IsNotEmpty()
    "content": string;

    @IsNotEmpty()
    "image": string;

    @IsNotEmpty()
    "location": string;

    @IsNotEmpty()
    "time": string;

    @IsNotEmpty()
    "createdAt": string;
}