import {Injectable} from "@nestjs/common";
import OpenAI       from "openai";
import * as process from "process";


const openai = new OpenAI({
    // organization: `${process.env.GPTID}`,
    // apiKey: `${process.env.GPTKEY}`,
    organization: "org-wCFeV0t98oLq11MO1V5gADP6",
    apiKey: "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",
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
