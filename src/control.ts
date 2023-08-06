import { Robot } from "./robot";
import { Position, Version } from "./types";

function executeRobotControlInterface(robotName: string, startPosition: Position, commandString: string, version: Version = "MK1", heading: number = 0) {
    console.log("Creating a " + version + " robot: " + robotName + " to start at position " + startPosition.x + "," + startPosition.y + " pointing in heading: " + heading);
    const robot = new Robot(robotName, startPosition, version, heading);
    robot.executeCommandString(commandString);
    robot.reportCurrentPosition();
}


executeRobotControlInterface("Robot 1", {x:0,y:0}, "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF");

executeRobotControlInterface("Robot 2", {x:3,y:6}, "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF");

executeRobotControlInterface("Robot 3", {x:0,y:7}, "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR");

// MK2 example
executeRobotControlInterface("Robot 4", {x:2,y:2}, "FFRFFLFF", "MK2", 0);