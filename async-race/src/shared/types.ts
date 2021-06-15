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
