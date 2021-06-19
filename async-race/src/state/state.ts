import { CarInfo, WinnerInfo } from '../shared/types';

export class State {
  garageCars: CarInfo[] = [];
  garageTotalCars = 0;
  garagePage = 1;

  winnersCars: WinnerInfo[] = [];
  winnersTotalCars = 0;
  winnersPage = 1;

  view = 'garage';
  sortBy = 'wins';
  sortOrder = 'desc';
  selectedCar: CarInfo | null = null;
  animation: { [index: string]: { id: number } };

  constructor() {
    this.animation = {};
  }
}

export const state = new State();
