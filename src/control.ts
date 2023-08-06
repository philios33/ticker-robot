import { Robot } from "./robot";
import { Position, Version } from "./types";

function executeRobotControlInterface(robotName: string, startPosition: Position, commandString: string, version: Version = "MK1", heading: number = 0) {
    console.log("Creating a " + version + " robot: " + robotName + " to start at position " + startPosition.x + "," + startPosition.y + " pointing in heading: " + heading);
    const robot = new Robot(robotName, startPosition, version, heading);
    robot.executeCommandString(commandString);
    robot.report();
}


console.log("Task 1");
executeRobotControlInterface("Robot 1", {x:0,y:0}, "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF");

executeRobotControlInterface("Robot 2", {x:3,y:6}, "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF");

executeRobotControlInterface("Robot 3", {x:0,y:7}, "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR");

// MK2 example
console.log("Task 2");
executeRobotControlInterface("Robot 4", {x:2,y:2}, "FFRFFLFF", "MK2", 0);

console.log("Task 3");

executeRobotControlInterface("Robot 5", {x:0,y:0}, "FFFFFF3FLFFFFFFR5FL", "MK3", 0);

executeRobotControlInterface("Robot 6", {x:4,y:3}, "FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF", "MK3", 0);
