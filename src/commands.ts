import { Command, Direction } from "./types";

export function commandFromDirection(direction: Direction): Command {
    return {
        direction: direction,
    }
}

export function parseCommandString(commandString: string): Array<Command> {
    const characters = commandString.split("");
    return characters.map((command, position) => {
        if (command === Direction.Forwards || command === Direction.Backwards || command === Direction.Left || command === Direction.Right) {
            return commandFromDirection(command);
        } else {
            throw new Error("Invalid command '" + command + "' at position: " + position + " of command string");
        }
    });
}
