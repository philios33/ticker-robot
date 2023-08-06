import { Command, Direction } from "./types";

export function commandFromDirection(direction: Direction): Command {
    return {
        direction: direction,
    }
}

export function parseCommandString(commandString: string): Array<Command> {
    const characters = commandString.split("");

    const results: Array<Command> = [];
    let nextCommandIterations = 1;
    let hasReceivedIterationsCommand = false; // Prevents two consequtive numbers
    for (const [position, character] of characters.entries()) {
        if (character === Direction.Forwards || character === Direction.Backwards || character === Direction.Left || character === Direction.Right) {
            for (let i=0; i<nextCommandIterations; i++) {
                results.push(commandFromDirection(character));
            }
            nextCommandIterations = 1;
            hasReceivedIterationsCommand = false;

        } else if (/^[1-5]$/.test(character)) {
            if (hasReceivedIterationsCommand) {
                throw new Error("Does not support more than a single digit number of iterations");
            }
            nextCommandIterations = parseInt(character);
            hasReceivedIterationsCommand = true;
            
        } else {
            throw new Error("Invalid character '" + character + "' at position: " + position + " of command string");
        }
    }
    return results;
}
