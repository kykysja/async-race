import { getCurrentPageCars } from './apiRequests';
import { Car } from './types';

export class State {
  view: string;
  garageCars?: Car[];
  garageTotalCars: number;
  garagePage: number;
  winnersCars?: Car[];
  winnersTotalCars: number;
  winnersPage: number;
  sortBy? = 'wins';
  sortOrder? = '';
  animation: any;
  selectedCar: Car | null;

  constructor() {
    this.view = 'garage';
    this.garageCars = [];
    this.garageTotalCars = 0;
    this.garagePage = 1;
    this.winnersCars = [];
    this.winnersTotalCars = 0;
    this.winnersPage = 1;
    this.selectedCar = null;
    this.animation = {};
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
