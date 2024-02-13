import {Injectable} from "@nestjs/common";
import OpenAI       from "openai";
import * as process from "process";


const openai = new OpenAI({
    organization: `${process.env.GPTID}`,
    apiKey: `${process.env.GPTKEY}`,
});


@Injectable()
export class AppService {
    async getHello() {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{
                role: "user",
                content: "Say this is a test",
            }],
            stream: true,
        });
        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }
    }
}
