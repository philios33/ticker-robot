import { parseCommandString } from "./commands";
import { Direction, Position } from "./types";

export class Robot {
    private name: string;
    private currentPosition: Position;

    constructor(name: string, currentPosition: Position) {
        this.name = name;
        this.currentPosition = currentPosition;
        console.log("Creating robot: " + name + " to start at position " + currentPosition.x + "," + currentPosition.y);
    }

    executeCommandString(commandString: string) {
        const commands = parseCommandString(commandString);
        for (const command of commands) {
            try {
                if (command.movementDirection === Direction.Forwards) {
                    this.moveForwards();
                } else if (command.movementDirection === Direction.Backwards) {
                    this.moveBackwards();
                } else if (command.movementDirection === Direction.Left) {
                    this.moveLeft();
                } else if (command.movementDirection === Direction.Right) {
                    this.moveRight();
                } else {
                    throw new Error("Unknown command.movementDirection: " + command.movementDirection);
                }
            } catch(e: any) {
                console.error("Error executing command on " + this.name + " in direction: " + command.movementDirection + " while at " + this.currentPosition.x + "," + this.currentPosition.y + ": " + e.message);
            }
        }
    }

    moveForwards() {
        // console.log("Moving forwards");
        this.currentPosition.y++;
    }
    moveBackwards() {
        if (this.currentPosition.y === 0) {
            throw new Error("Cannot move: At X axis wall");
        }
        // console.log("Moving backwards");
        this.currentPosition.y--;
    }
    moveLeft() {
        if (this.currentPosition.x === 0) {
            throw new Error("Cannot move: At Y axis wall");
        }
        // console.log("Moving left");
        this.currentPosition.x--;
    }
    moveRight() {
        // console.log("Moving right");
        this.currentPosition.x++;
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    reportCurrentPosition() {
        console.log(this.name + " current position is: " + this.currentPosition.x + "," + this.currentPosition.y);
    }
}
