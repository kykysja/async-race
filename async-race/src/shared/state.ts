import { getCurrentPageCars } from './apiRequests';
import { Car } from './types';

export class State {
  view: string;
  garageCars?: Car[] | null;
  garageTotalCars: number;
  garagePage: number;
  winnersCars?: Car[] | null;
  winnersTotalCars: number;
  winnersPage: number;
  sortBy? = 'wins';
  sortOrder? = '';
  animation = {};
  selectedCar: Car | null;

  constructor() {
    this.view = 'garage';
    this.garageCars = null;
    this.garageTotalCars = 0;
    this.garagePage = 1;
    this.winnersCars = null;
    this.winnersTotalCars = 0;
    this.winnersPage = 1;
    this.selectedCar = null;
  }

  updateGarageCars = async (): Promise<void> => {
    const { garageCars, garageTotalCars } = await getCurrentPageCars(this.garagePage);
    this.garageCars = garageCars;
    if (garageTotalCars !== null) this.garageTotalCars = +garageTotalCars;
  };
}

export const state = new State();

/* static updateGaragePage(): void {
    if (this.garageTotalCars / 7 >= this.garagePage) {
      this.garagePage++;
    } else {
      this.garagePage = 1;
    }
  } */
