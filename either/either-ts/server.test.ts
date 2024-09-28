import {
    describe,
    expect,
    test,
}               from "bun:test";
import {Either} from "effect";
import "./server.ts";

describe("Bun server", () => {
    test.each([
        {value: 0.3},
        {value: 0.4},
        {value: 0.5},
        {value: 0.6},
    ])(`should return Either.right when value is greater than 0.5`, async ({value}) => {
        const response = await fetch(`http://localhost:3000?v=${value}`);
        const result = await response.json();

        expect(response.status).toBe(200);
        Either.match(result, {
            onLeft: (left) => expect(left).toBe("Failed to fetch data"),
            onRight: (right) => expect(right).toBe("This is the data from service"),
        });
    });

    test(`should return 404 for unknown paths`, async () => {
        const response = await fetch(`http://localhost:3000/unknown}`);
        const result = await response.text();

        expect(response.status).toBe(200);
        expect(result).toBe("404!");
    });
});
