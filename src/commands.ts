import { Command, Direction } from "./types";

export function commandFromDirection(direction: Direction): Command {
    return {
        direction: direction,
    }
}

export function parseCommandString(commandString: string): Array<Command> {
    const characters = commandString.split("");

    const results: Array<Command> = [];
    let nextForwardBoostAmount: number | null = null;
    for (const [position, character] of characters.entries()) {
        if (character === Direction.Forwards || character === Direction.Backwards || character === Direction.Left || character === Direction.Right) {
            if (nextForwardBoostAmount === null) {
                results.push(commandFromDirection(character));
            } else {
                if (character === Direction.Forwards) {
                    const mc = commandFromDirection(character);
                    mc.boost = nextForwardBoostAmount;
                    results.push(mc);
                    nextForwardBoostAmount = null;
                } else {
                    throw new Error("Cannot boost in direction: " + character);
                }
            }

        } else if (/^[1-5]$/.test(character)) {
            if (nextForwardBoostAmount !== null) {
                throw new Error("Does not support more than a single digit number of boost");
            }
            nextForwardBoostAmount = parseInt(character);

        } else {
            throw new Error("Invalid character '" + character + "' at position: " + position + " of command string");
        }
    }
    return results;
}
