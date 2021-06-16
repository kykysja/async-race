// import { winnersView } from '../pages/winners/winners-view';
// import { state } from './state';
import { winnersView } from '../pages/winners/winners-view';
import { state } from './state';
import { Car, GetWinners } from './types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCurrentPageCars = async (
  page: number,
  limit = 7
): Promise<{ garageCars: []; garageTotalCars: string | null }> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    garageCars: await response.json(),
    garageTotalCars: response.headers.get('X-Total-Count'),
  };
};

export const addCar = async (body: {
  name: string;
  color: string;
}): Promise<{ id: number; name: string; color: string }> => {
  const res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const car = await res.json();

  return car;
};

export const getCar = async (id: string): Promise<Car> => (await fetch(`${garage}/${id}`)).json();

export const updateCar = async (id: number, body: { name: string; color: string }): Promise<void> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteCar = async (id: number) =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const startEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const stopEngine = async (id: number): Promise<void> =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const setSortOrder = async (sortBy: string) => {
  state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
  state.sortBy = sortBy;

  await state.updateWinnersCars();
  winnersView.render();
};

export const deleteWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const getWinner = async (id: number) => (await fetch(`${winners}/${id}`)).json();

export const getWinners = async (
  page: number,
  sort: string,
  order: string,
  limit = 10
): Promise<GetWinners> => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: any) => ({ ...winner, car: await getCar(winner.id) }))
    ),
    count: +response.headers.get('X-Total-Count')!,
  };
};

export const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const createWinner = async (body: { id: number; wins: number; time: number }) =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, body: { id: number; wins: number; time: number }) =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async (id: number, time: number) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
