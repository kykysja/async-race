import { getCurrentPageCars, getWinners } from './apiRequests';
import { Car, WinnerData } from './types';

export class State {
  view = 'garage';
  garageCars: Car[] = [];
  garageTotalCars = 0;
  garagePage = 1;
  winnersCars: WinnerData[] = [];
  winnersTotalCars = 0;
  winnersPage = 1;
  sortBy = 'wins';
  sortOrder = 'desc';
  animation: any;
  selectedCar: Car | null = null;

  constructor() {
    this.animation = {};
  }

  updateGarageCars = async (): Promise<void> => {
    const { garageCars, garageTotalCars } = await getCurrentPageCars(this.garagePage);
    this.garageCars = garageCars;
    if (garageTotalCars !== null) this.garageTotalCars = +garageTotalCars;
  };

  updateWinnersCars = async () => {
    const { items, count } = await getWinners(this.winnersPage, this.sortBy!, this.sortOrder!);

    this.winnersCars = items;
    this.winnersTotalCars = +count;
  };
}

export const state = new State();
