import { Car } from './types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

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
