import { describe, expect, test } from '@jest/globals';
import { Robot } from './robot';

describe("Robot test", () => {
    test("Clockwise circle movement", () => {
        const startPosition = {x:0,y:0}
        const r = new Robot("Test", startPosition);
        // Clockwise circle
        r.moveForwards();
        r.moveRight();
        r.moveBackwards();
        r.moveLeft();
        expect(r.getCurrentPosition()).toEqual(startPosition);
    });

    test("Forwards and right movement", () => {
        const r = new Robot("Test", {x:2,y:2});
        // Clockwise circle
        r.moveForwards();
        r.moveForwards();
        r.moveRight();
        r.moveRight();
        expect(r.getCurrentPosition()).toEqual({x:4,y:4});
    });

    test("Cannot move in to the wall", () => {
        const r = new Robot("Test", {x:2,y:2});
        r.moveBackwards();
        r.moveBackwards();
        expect(() => {
            r.moveBackwards();
        }).toThrow("Cannot move: At X axis wall");

        expect(r.getCurrentPosition()).toEqual({x:2,y:0});
        

    })
});