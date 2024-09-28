import {Match}              from "effect";
import {getDataFromService} from "./app.ts";

Bun.serve({
    fetch(req) {
        const path = new URL(req.url).pathname;

        return Match.value(path).pipe(
            Match.when("/", () => {
                const value = new URLSearchParams(new URL(req.url).search).get("v") || 0;
                return new Response(getDataFromService(Number.parseFloat(value)));
            }),
            Match.orElse(() => new Response("404!")),
        );
    },
});
