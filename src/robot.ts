import { parseCommandString } from "./commands";
import { Command, Direction, Position, Version } from "./types";

export class Robot {
    private name: string;
    private currentPosition: Position;
    private version: Version;
    private heading: number; // 0 = North/Up, 90 = East/Right, 180 = South/Down, 270 = West/Left
    private remainingFuel: number | null = null;
    private allowNegativeSpace: boolean = false;

    constructor(name: string, currentPosition: Position, version: Version = "MK1", heading: number = 0) {
        this.name = name;
        this.currentPosition = currentPosition;
        this.version = version;
        this.heading = heading;
        if (version === "MK3") {
            this.remainingFuel = 30;
            this.allowNegativeSpace = true;
        }
    }

    executeCommandString(commandString: string) {
        const commands = parseCommandString(commandString);
        for (const command of commands) {
            try {
                this.executeCommand(command);
            } catch(e: any) {
                console.error("Error executing command on " + this.name + " in direction: " + command.direction + " while at " + this.currentPosition.x + "," + this.currentPosition.y + ": " + e.message);                
            }
        }
    }

    executeCommand(command: Command) {
        if (this.version === "MK1") {
            if (command.direction === Direction.Forwards) {
                this.moveForwards();

            } else if (command.direction === Direction.Backwards) {
                this.moveBackwards();

            } else if (command.direction === Direction.Left) {
                this.moveLeft();

            } else if (command.direction === Direction.Right) {
                this.moveRight();

            } else {
                throw new Error("Unknown command.direction: " + command.direction);
            }
        } else if (this.version === "MK2" || this.version === "MK3") {
            if (command.direction === Direction.Forwards) {
                if (this.version === "MK3" && typeof command.boost === "number") {
                    this.moveForwards(true, command.boost);
                } else {
                    this.moveForwards();
                }

            } else if (command.direction === Direction.Backwards) {
                throw new Error("MK2/3 cannot move backwards");

            } else if (command.direction === Direction.Left) {
                this.rotateAntiClockwise();

            } else if (command.direction === Direction.Right) {
                this.rotateClockwise();

            } else {
                throw new Error("Unknown command.direction: " + command.direction);
            }
        } else {
            throw new Error("Unknown robot version: " + this.version);
        }
    }



    moveForwards(isBoost: boolean = false, movementAmount: number = 1) {

        if (isBoost) {
            if (this.remainingFuel !== null) {
                if (this.remainingFuel <= 0) {
                    throw new Error("Out of fuel");
                }
                this.remainingFuel -= movementAmount;
            } else {
                throw new Error("No fuel tank but a boost was attempted");
            }
        }

        if (this.heading === 0) {
            this.currentPosition.y += movementAmount;

        } else if (this.heading === 90) {
            this.currentPosition.x += movementAmount;

        } else if (this.heading === 180) {
            if (!this.allowNegativeSpace) {
                if (movementAmount !== 1) {
                    throw new Error("Cannot boost in non allowed negative space");
                }
                if (this.currentPosition.y === 0) {
                    throw new Error("Cannot move: At X axis/Bottom wall");
                }
            }
            this.currentPosition.y -= movementAmount;

        } else if (this.heading === 270) {
            if (!this.allowNegativeSpace) {
                if (movementAmount !== 1) {
                    throw new Error("Cannot boost in non allowed negative space");
                }
                if (this.currentPosition.x === 0) {
                    throw new Error("Cannot move: At Y axis/Left wall");
                }
            }
            this.currentPosition.x -= movementAmount;

        } else {
            throw new Error("Cannot keep track of position due to robot having a non standard heading: " + this.heading);
        }

        

        // Send command to locomotion system
    }

    moveBackwards() {
        if (this.heading === 0) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.y === 0) {
                    throw new Error("Cannot move: At X axis/Bottom wall");
                }
            }
            this.currentPosition.y--;

        } else if (this.heading === 90) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.x === 0) {
                    throw new Error("Cannot move: At Y axis/Left wall");
                }
            }
            this.currentPosition.x--;

        } else if (this.heading === 180) {
            this.currentPosition.y++;

        } else if (this.heading === 270) {
            this.currentPosition.x++;

        } else {
            throw new Error("Cannot keep track of position due to robot having a non standard heading: " + this.heading);
        }
        // Send command to locomotion system
    }

    moveLeft() {
        if (this.heading === 0) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.x === 0) {
                    throw new Error("Cannot move: At Y axis/Left wall");
                }
            }
            this.currentPosition.x--;

        } else if (this.heading === 90) {
            this.currentPosition.y++;

        } else if (this.heading === 180) {
            this.currentPosition.x++;

        } else if (this.heading === 270) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.y === 0) {
                    throw new Error("Cannot move: At X axis/Bottom wall");
                }
            }
            this.currentPosition.y--;

        } else {
            throw new Error("Cannot keep track of position due to robot having a non standard heading: " + this.heading);
        }
        // Send command to locomotion system
    }

    moveRight() {
        if (this.heading === 0) {
            this.currentPosition.x++;

        } else if (this.heading === 90) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.y === 0) {
                    throw new Error("Cannot move: At X axis/Bottom wall");
                }
            }
            this.currentPosition.y--;

        } else if (this.heading === 180) {
            if (!this.allowNegativeSpace) {
                if (this.currentPosition.x === 0) {
                    throw new Error("Cannot move: At Y axis/Left wall");
                }
            }
            this.currentPosition.x--;

        } else if (this.heading === 270) {
            this.currentPosition.y++;

        } else {
            throw new Error("Cannot keep track of position due to robot having a non standard heading: " + this.heading);
        }
        // Send command to locomotion system
    }
    rotateClockwise() {
        if (this.version === "MK1") {
            throw new Error("Cannot rotate a MK1");
        }
        this.heading += 90;
        if (this.heading >= 360) {
            this.heading -= 360;
        }
    }
    rotateAntiClockwise() {
        if (this.version === "MK1") {
            throw new Error("Cannot rotate a MK1");
        }
        this.heading -= 90;
        if (this.heading < 0) {
            this.heading += 360;
        }
    }



    getCurrentPosition() {
        return this.currentPosition;
    }

    getCurrentHeading() {
        return this.heading;
    }

    getCurrentRemainingFuel() {
        if (this.remainingFuel === null) {
            throw new Error("This robot does not have a fuel tank");
        }
        return this.remainingFuel;
    }

    report() {
        console.log(this.name + " current position is: " + this.currentPosition.x + "," + this.currentPosition.y + " pointing in heading: " + this.heading + " with " + this.remainingFuel + " remaining fuel");
    }
}
