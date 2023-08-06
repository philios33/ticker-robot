import { describe, expect, test } from '@jest/globals';
import { parseCommandString } from './commands';
import { Direction } from './types';

describe("Parsing commands", () => {
    test("Parse forward example", () => {
        const str = "F";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Forwards,
        }];
        expect(result).toEqual(expected);
    });
    test("Parse backwards example", () => {
        const str = "B";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Backwards,
        }];
        expect(result).toEqual(expected);
    });
    test("Parse left example", () => {
        const str = "L";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Left,
        }];
        expect(result).toEqual(expected);
    });
    test("Parse right example", () => {
        const str = "R";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Right,
        }];
        expect(result).toEqual(expected);
    });

    test("Fail with unexpected char", () => {
        const str = "G";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Fail with unexpected char at end", () => {
        const str = "FFG";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Fail with whitespace", () => {
        const str = " F ";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Multiple command example", () => {
        const str = "FLB";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Forwards,
        },{
            direction: Direction.Left,
        },{
            direction: Direction.Backwards,
        }];
        expect(result).toEqual(expected);
    })

    test("Boost command", () => {
        const str = "2F";
        const result = parseCommandString(str);
        const expected = [{
            boost: 2,
            direction: Direction.Forwards,
        }];
        expect(result).toEqual(expected);
    });

    test("Boost command with others", () => {
        const str = "FF2FF";
        const result = parseCommandString(str);
        const expected = [{
            direction: Direction.Forwards,
        },{
            direction: Direction.Forwards,
        },{
            boost: 2,
            direction: Direction.Forwards,
        },{
            direction: Direction.Forwards,
        }];
        expect(result).toEqual(expected);
    });

    test("Zero Boost fails", () => {
        const str = "FF0F";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Six Boost fails", () => {
        const str = "FF6F";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Single Boost command", () => {
        const str = "1F";
        const result = parseCommandString(str);
        const expected = [{
            boost: 1,
            direction: Direction.Forwards,
        }];
        expect(result).toEqual(expected);
    });

    test("Two consequtive numbers fail", () => {
        const str = "FFL23F";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    test("Only boost in forward direction", () => {
        const str = "3L";
        expect(() => {
            const result = parseCommandString(str);
        }).toThrow();
    });

    
});