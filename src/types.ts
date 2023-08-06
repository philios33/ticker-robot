export enum Direction {
    Forwards = "F",
    Backwards = "B",
    Left = "L",
    Right = "R",
}

export type Command = {
    direction: Direction
}

export type Position = {
    x: number
    y: number
}

export type Version = "MK1" | "MK2"