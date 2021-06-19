export type Car = {
  id: number;
  name: string;
  color: string;
};

export type CarInfo = {
  id: number;
  name: string;
  color: string;
  position?: number;
  wins?: number;
  time?: number;
  isEngineStarted?: boolean;
};

export type PageCars = {
  garageCars: [];
  garageTotalCars: string | null;
};

export type Winner = {
  name: string;
  color: string;
  id: number;
  time: number;
};

export type WinnerInfo = {
  id: number;
  wins: number;
  time: number;
  car: {
    name: string;
    color: string;
    id: number;
  };
};

export type GetWinner = {
  id: number;
  wins: number;
  time: number;
};

export type GetWinners = {
  winners: WinnerInfo[];
  winnersTotalCars: string | null;
};

export type WinnerRaceAll = {
  id?: number;
  name?: string;
  color?: string;
  position?: number;
  wins?: number;
  time: number;
  isEngineStarted?: boolean;
};

export type Success = {
  success: boolean;
  id: number;
  time: number;
};
