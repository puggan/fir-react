export enum ColorTexts {
    Blue = 'Blue',
    Red = 'Red',
}

export type Color = ColorTexts.Blue | ColorTexts.Red;

export enum StatusTexts {
    Tie = "tie",
    WaitingP1 = "waiting for player 1",
    WaitingP2 = "waiting for player 2",
    WonP1 = "won by player 1",
    WonP2 = "won by player 2",
}

export type Status =
    StatusTexts.Tie
    | StatusTexts.WaitingP1
    | StatusTexts.WaitingP2
    | StatusTexts.WonP1
    | StatusTexts.WonP2;

export type DateTime = string;
export type UserName = string;
export type PawnState = 0 | 1 | 2;

export interface Game {
    Game_ID: number;
    Player1_ID: number;
    Player1: UserName;
    Player2_ID: number;
    Player2: UserName;
    Start_Time: DateTime;
    Status: Status;
}

export interface Pawn {
    Game_ID: number;
    X: number;
    Y: number;
    Color: Color;
    NR: number;
}

export interface Player {
    Player_ID: number;
    User_Name: string;
}

export interface Token {
    Token: string;
    Player_ID: number;
    Player: Player;
}
