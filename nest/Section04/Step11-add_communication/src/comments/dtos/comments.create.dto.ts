import {Comments} from "../commenst.schema";
import {PickType} from "@nestjs/swagger";

export class CommentsCreateDto extends PickType(Comments, [
    'author',
    'contents',
] as const) {
}