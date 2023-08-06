export enum Direction {
    Forwards = "F",
    Backwards = "B",
    Left = "L",
    Right = "R",
}

export type Command = {
    boost?: number
    direction: Direction
}

export type Position = {
    x: number
    y: number
}

export type Version = "MK1" | "MK2" | "MK3";