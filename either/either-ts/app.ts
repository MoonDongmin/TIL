import {Either} from "effect";

export const getDataFromService = (value: number) => {
    return value > 0.5
        ? Either.right({
            id: "1",
            name: "test",
            email: "test@naver.com",
        })
        : Either.left({error: "Failed to fetch data"});
};
