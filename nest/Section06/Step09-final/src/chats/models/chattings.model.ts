import {IsNotEmpty, IsString} from "class-validator";
import {Document, SchemaOptions, Types} from "mongoose";
import {SchemaFactory, Schema, Prop} from "@nestjs/mongoose";
import {Socket as SocketModel} from "./sockets.model";

const options: SchemaOptions = {
    collection: "chattings",
    timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
    @Prop({
        type: {
            _id: {type: Types.ObjectId, required: true, ref: "sockets"},
            id: {type: String},
            username: {type: String, required: true},
        },
    })
    @IsNotEmpty()
    @IsString()
    user: SocketModel;

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    chat: string;

}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);