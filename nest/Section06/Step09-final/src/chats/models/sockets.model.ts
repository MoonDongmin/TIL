import {IsNotEmpty, IsString} from "class-validator";
import {Document, SchemaOptions} from "mongoose";
import {SchemaFactory, Schema, Prop} from "@nestjs/mongoose";

const options: SchemaOptions = {
    id: false,
    collection: "sockets",
    timestamps: true,
};

@Schema(options)
export class Socket extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    username: string;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);