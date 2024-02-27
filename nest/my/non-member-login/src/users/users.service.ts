import {Injectable} from "@nestjs/common";
import {v1 as uuid} from "uuid";

@Injectable()
export class UsersService {
    getToken(): string {
        return uuid();
    }
}
