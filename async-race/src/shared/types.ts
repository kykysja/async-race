export type Car = {
  id: number;
  name: string;
  color: string;
  position?: number;
  wins?: number;
  time?: number;
  isEngineStarted?: boolean;
};

export type Winner = {
  name: string;
  color: string;
  id: number;
  time: number;
};

export type IdTimeObj = {
  id: number;
  time: number;
};

export type Winners = {
  [index: number]: WinnerData;
};

export type WinnerData = {
  id: number;
  wins: number;
  time: number;
  car: {
    name: string;
    color: string;
    id: number;
  };
};

export type GetWinners = {
  items: WinnerData[];
  count: number;
};
