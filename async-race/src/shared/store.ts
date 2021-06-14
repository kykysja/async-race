import { carSvg } from '../../public/car-svg';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

export const getCarImage = (color: string): string => carSvg(color);

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export abstract class Store {
  static state = {
    garageTotalCars: 4,
    garagePage: 1,

    winnersTotalCars: 4,
    winnersPage: 1,

    sortBy: 'wins',
    sortOrder: '',

    garageCars: [
      {
        id: 1,
        brand: 'BMW',
        model: 'M5',
        color: 'green',
        position: 0,
        wins: 1,
        bestTime: 2.45,
        isEngineStarted: false,
        sortBy: 'wins',
        sortOrder: '',
      },
      {
        id: 2,
        brand: 'Kia',
        model: 'Ceed',
        color: 'red',
        position: 0,
        wins: 0,
        bestTime: 6.74,
        isEngineStarted: false,
      },
      {
        id: 3,
        brand: 'Opel',
        model: 'Omega',
        color: 'snow',
        position: 0,
        wins: 0,
        bestTime: 3.45,
        isEngineStarted: false,
      },
      {
        id: 4,
        brand: 'Lanos',
        model: '7',
        color: 'blue',
        position: 0,
        wins: 0,
        bestTime: 5.24,
        isEngineStarted: false,
      },
    ],

    winnersCars: [
      {
        id: 1,
        brand: 'BMW',
        model: 'M5',
        color: 'green',
        position: 0,
        wins: 2,
        bestTime: 2.45,
      },
      {
        id: 3,
        brand: 'Opel',
        model: 'Omega',
        color: 'Dlue',
        position: 0,
        wins: 1,
        bestTime: 3.48,
      },
      {
        id: 2,
        brand: 'Kia',
        model: 'Ceed',
        color: 'red',
        position: 0,
        wins: 0,
        bestTime: 6.74,
        isEngineStarted: false,
      },
    ],
  };

  static updateGaragePage(): void {
    if (this.state.garageTotalCars / 7 >= this.state.garagePage) {
      this.state.garagePage++;
    } else {
      this.state.garagePage = 1;
    }
  }
  static updateGarageTotalCars = async (): Promise<number> => {
    const response = await fetch(`${garage}`);
    const cars = await response.json();

    return cars.length;
  };
  static set garageTotalCars(value: number) {
    this.state.garageTotalCars = value;
  }

  /* constructor() {
    // this.totalCars = 4;
    // this.cars = null;
  } */
  /* get totalCars(): number {
    return this.totalCars;
  }
  set totalCars(value: number) {
    this.totalCars = value;
  } */
}
