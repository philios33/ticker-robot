import { describe, expect, test } from '@jest/globals';
import { Robot } from './robot';
import { Direction } from './types';

describe("MK1 Robot test", () => {
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
        }).toThrow();

        expect(r.getCurrentPosition()).toEqual({x:2,y:0});
        
    });

});

describe("MK2 Robot test", () => {

    test("Forwards and right movement", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2");

        r.executeCommand({direction: Direction.Forwards});
        r.executeCommand({direction: Direction.Forwards});
        r.executeCommand({direction: Direction.Right});
        r.executeCommand({direction: Direction.Right});

        expect(r.getCurrentPosition()).toEqual({x:2,y:4});
        expect(r.getCurrentHeading()).toEqual(180);
    });

    test("Cannot move in to the back/bottom wall", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 180);
        r.executeCommand({direction: Direction.Forwards});
        r.executeCommand({direction: Direction.Forwards});
        expect(r.getCurrentPosition()).toEqual({x:2,y:0});

        expect(() => {
            r.executeCommand({direction: Direction.Forwards});
        }).toThrow();

        expect(r.getCurrentPosition()).toEqual({x:2,y:0});
        
    });

    test("Does not actually change position with L and R commands", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 0);
        r.executeCommand({direction: Direction.Left});
        r.executeCommand({direction: Direction.Left});
        r.executeCommand({direction: Direction.Left});
        r.executeCommand({direction: Direction.Left});
        
        expect(r.getCurrentPosition()).toEqual({x:2,y:2});
        expect(r.getCurrentHeading()).toEqual(0);
    });

    test("Rotates right", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 90);
        r.executeCommand({direction: Direction.Right});
        
        expect(r.getCurrentPosition()).toEqual({x:2,y:2});
        expect(r.getCurrentHeading()).toEqual(180);
    });

    test("Rotates left", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 270);
        r.executeCommand({direction: Direction.Left});
        
        expect(r.getCurrentPosition()).toEqual({x:2,y:2});
        expect(r.getCurrentHeading()).toEqual(180);
    });

    test("Moves right", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 0);
        r.executeCommand({direction: Direction.Right});
        r.executeCommand({direction: Direction.Forwards});
        
        expect(r.getCurrentPosition()).toEqual({x:3,y:2});
        expect(r.getCurrentHeading()).toEqual(90);

        r.executeCommand({direction: Direction.Forwards});

        expect(r.getCurrentPosition()).toEqual({x:4,y:2});
        expect(r.getCurrentHeading()).toEqual(90);
    });

    test("Turns around", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 90);
        r.executeCommand({direction: Direction.Right});
        r.executeCommand({direction: Direction.Right});
        r.executeCommand({direction: Direction.Forwards});
        
        expect(r.getCurrentPosition()).toEqual({x:1,y:2});
        expect(r.getCurrentHeading()).toEqual(270);

        r.executeCommand({direction: Direction.Forwards});

        expect(r.getCurrentPosition()).toEqual({x:0,y:2});
        expect(r.getCurrentHeading()).toEqual(270);

    });

    test("Wont fall off left side of building", () => {
        const r = new Robot("Test", {x:0,y:2}, "MK2", 270);

        expect(() => {
            r.executeCommand({direction: Direction.Forwards});
        }).toThrow();

    });

    test("Ignores backwards commands", () => {
        const r = new Robot("Test", {x:0,y:2}, "MK2", 270);

        expect(() => {
            r.executeCommand({direction: Direction.Backwards});
        }).toThrow();

        expect(r.getCurrentPosition()).toEqual({x:0,y:2});
        expect(r.getCurrentHeading()).toEqual(270);
    });

    test("ZigZag pattern", () => {
        const r = new Robot("Test", {x:2,y:2}, "MK2", 0);
        r.executeCommandString("FFRFFLFF");
        expect(r.getCurrentPosition()).toEqual({x:4,y:6});
        expect(r.getCurrentHeading()).toEqual(0);
        
    })
    
});