import { Robot } from "./robot";
import { Position } from "./types";

function executeRobotControlInterface(robotName: string, startPosition: Position, commandString: string) {
    const robot = new Robot(robotName, startPosition);
    robot.executeCommandString(commandString);
    robot.reportCurrentPosition();
}


executeRobotControlInterface("Robot 1", {x:0,y:0}, "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF");

executeRobotControlInterface("Robot 2", {x:3,y:6}, "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF");

executeRobotControlInterface("Robot 3", {x:0,y:7}, "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR");
