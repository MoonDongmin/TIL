import {
    describe,
    expect,
    test,
}               from "bun:test";
import {Either} from "effect";
import {getDataFromService} from "./app.ts";

describe(`getDataFromService`, () => {
    test.each([
        {value: 0.3},
        {value: 0.4},
        {value: 0.5},
        {value: 0.6},
    ])(`should return Either.right when value is greater than 0.5`, ({value}) => {
        Either.match(getDataFromService(value), {
            onLeft: (left) => expect(left).toBe("Failed to fetch data"),
            onRight: (right) => expect(right).toBe("This is the data from service"),
        });
    });
});
