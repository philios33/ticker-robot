export enum Direction {
    Forwards = "F",
    Backwards = "B",
    Left = "L",
    Right = "R",
}

export type Command = {
    movementDirection: Direction
}

export type Position = {
    x: number
    y: number
}