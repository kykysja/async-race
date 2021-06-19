import { winnersView } from '../pages/winners/winners-view';
import { Car, CarInfo, GetWinner, GetWinners, PageCars, Winner } from '../shared/types';
import { state } from '../state/state';

export class ApiRequests {
  base: string;
  garage: string;
  engine: string;
  winners: string;

  constructor() {
    this.base = 'http://127.0.0.1:3000';
    this.garage = `${this.base}/garage`;
    this.engine = `${this.base}/engine`;
    this.winners = `${this.base}/winners`;
  }

  getCurrentPageCars = async (page: number, limit = 7): Promise<PageCars> => {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);

    return {
      garageCars: await response.json(),
      garageTotalCars: response.headers.get('X-Total-Count'),
    };
  };

  addCar = async (body: { name: string; color: string }): Promise<Car> => {
    const res = await fetch(this.garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const car = await res.json();
    return car;
  };

  getCar = async (id: number): Promise<CarInfo> => (await fetch(`${this.garage}/${id}`)).json();

  updateCar = async (id: number, body: { name: string; color: string }): Promise<void> =>
    (
      await fetch(`${this.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

  deleteCar = async (id: number): Promise<Car> =>
    (await fetch(`${this.garage}/${id}`, { method: 'DELETE' })).json();

  updateGarageCars = async (): Promise<void> => {
    const { garageCars, garageTotalCars } = await this.getCurrentPageCars(state.garagePage);
    state.garageCars = garageCars;
    if (garageTotalCars !== null) state.garageTotalCars = +garageTotalCars;
  };

  startEngine = async (id: number): Promise<{ velocity: number; distance: number }> =>
    (await fetch(`${this.engine}?id=${id}&status=started`)).json();

  drive = async (id: number): Promise<{ success: boolean }> => {
    const res = await fetch(`${this.engine}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  };

  stopEngine = async (id: number): Promise<void> =>
    (await fetch(`${this.engine}?id=${id}&status=stopped`)).json();

  getSortOrder = (sort: string, order: string): string => {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
  };

  setSortOrder = async (sortBy: string): Promise<void> => {
    state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    state.sortBy = sortBy;

    await this.updateWinnersCars();
    winnersView.render();
  };

  deleteWinner = async (id: number): Promise<Winner> =>
    (await fetch(`${this.winners}/${id}`, { method: 'DELETE' })).json();

  getWinner = async (id: number): Promise<GetWinner> =>
    (await fetch(`${this.winners}/${id}`)).json();

  getWinners = async (
    page: number,
    sort: string,
    order: string,
    limit = 10
  ): Promise<GetWinners> => {
    const response = await fetch(
      `${this.winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`
    );
    const winners = await response.json();

    return {
      winners: await Promise.all(
        winners.map(async (winner: GetWinner) => ({ ...winner, car: await this.getCar(winner.id) }))
      ),
      winnersTotalCars: response.headers.get('X-Total-Count'),
    };
  };

  getWinnerStatus = async (id: number): Promise<number> =>
    (await fetch(`${this.winners}/${id}`)).status;

  createWinner = async (body: GetWinner): Promise<Winner> =>
    (
      await fetch(this.winners, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

  updateWinner = async (id: number, body: GetWinner): Promise<Winner> =>
    (
      await fetch(`${this.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

  saveWinner = async (id: number, time: number): Promise<void> => {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);

      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };

  updateWinnersCars = async (): Promise<void> => {
    const { winners, winnersTotalCars } = await this.getWinners(
      state.winnersPage,
      state.sortBy,
      state.sortOrder
    );

    state.winnersCars = winners;
    if (winnersTotalCars) state.winnersTotalCars = +winnersTotalCars;
  };
}

export const request = new ApiRequests();
