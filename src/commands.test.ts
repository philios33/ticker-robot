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
});