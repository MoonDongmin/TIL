import {
    match,
    P,
}                  from "ts-pattern";
import {Match}     from "effect";
import {undefined} from "effect/Match";

const isNullish = (a: unknown): a is null | undefined =>
    a === null || a === undefined;

// ts-pattern
// const doSomething = (a: unknown): string => {
//     return match<unknown>(a)
//         .with(P.string, () => "string")
//         .with(P.number, () => "number")
//         .with(P.nullish, () => "nullish")
//         .with(P._, () => "unknown")
//         .exhaustive();
// };

// effect
const doSomething =
    Match.type<unknown>().pipe(
        Match.when(Match.string, () => "string"),
        Match.when(Match.number, () => "number"),
        Match.when(isNullish, () => "nullish"),
        Match.orElse(() => "unknown"),
    );

console.info(doSomething("dongmin"));
console.info(doSomething(1));
console.info(doSomething(null));
console.info(doSomething(undefined));
console.info(doSomething({}));
