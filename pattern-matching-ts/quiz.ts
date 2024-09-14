import {Match}     from "effect";
import {undefined} from "effect/Match";

interface Shape {
    print(): string;
}

class Rectangle implements Shape {
    print(): string {
        return "rectangle";
    }
}

class Triangle implements Shape {
    print(): string {
        return "rectangle";
    }
}

class Circle implements Shape {
    print(): string {
        return "rectangle";
    }
}

const isRectangle = (shape: unknown): shape is Rectangle =>
    shape instanceof Rectangle;

const isNullish = (a: unknown): a is null | undefined =>
    a === null || a === undefined;

const printShape = Match.type<unknown>().pipe(
    Match.when(isRectangle, () => "rectangle"),
    Match.when((a: Shape) => a instanceof Triangle, () => "triangle"),
    Match.when((a: Shape) => a instanceof Circle, () => "circle"),
    Match.when(isNullish, () => "nullish"),
    Match.orElse(() => "unknown"),
);

const rectangle: Shape = new Rectangle();
printShape(rectangle);

const triangle: Shape = new Triangle();
printShape(triangle);

const circle: Shape = new Circle();
printShape(circle);

