import { pipe } from "../pipe";

describe("pipe", () => {
    it("returns the source value when no functions are provided", () => {
        expect(pipe("hello")).toBe("hello");
    });

    it("passes a value through functions from left to right", () => {
        const result = pipe(
            " hello pipe ",
            (value) => value.trim(),
            (value) => value.toUpperCase(),
            (value) => `${value}!`,
        );

        expect(result).toBe("HELLO PIPE!");
    });
});
