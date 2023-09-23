import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io";

@WebSocketGateway()
export class ChatsGateway {
    @SubscribeMessage("new_user") // 이 new_user를 실행시킨다는 말, 브라우저에서 들고온것
    handleNewUser(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        console.log(socket.id);
        console.log(username);
        socket.emit("hello_user", `hello ${username}`);
    }
}
