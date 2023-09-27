import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from "@nestjs/websockets";

import {Socket} from "socket.io";
import {Logger} from "@nestjs/common";

@WebSocketGateway({namespace: "chattings"})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger("chat");

    constructor() {
        this.logger.log("constructor");
    }

    handleDisconnect(@ConnectedSocket() socket:Socket) {
        this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`)
    }

    handleConnection(@ConnectedSocket() socket: Socket): any {
        this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
    }

    afterInit() {
        this.logger.log("init");
    }

    @SubscribeMessage("new_user") // 이 new_user를 실행시킨다는 말, 브라우저에서 들고온것
    handleNewUser(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        // username db에 적재
        socket.broadcast.emit("user_connected",username);
        return username;
    }

    @SubscribeMessage("submit_chat")
    handleSubmitChat(
        @MessageBody() chat: string,
        @ConnectedSocket() socket: Socket,
    ) {
        socket.broadcast.emit('new_chat',{
            chat,
            username: socket.id,
        });
    }
}
