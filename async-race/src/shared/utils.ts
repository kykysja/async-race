import { state } from './state';
import { Winner } from './types';

export function getPosition(element: HTMLElement): { x: number; y: number } {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistance(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getPosition(a);
  const bPosition = getPosition(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animation(
  car: HTMLElement,
  distance: number,
  animationTime: number
): { id: number } {
  let start: number | null = null;
  const store: any = {};

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      store.id = window.requestAnimationFrame(step);
    }
  }
  store.id = window.requestAnimationFrame(step);

  return store;
}

export const raceAll = async (
  promises: Promise<{
    success: any;
    id: number;
    time: number;
  }>[],
  ids: number[]
): Promise<any> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }
  return { ...state.garageCars!.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (
  action: (id: number) => Promise<{
    success: any;
    id: number;
    time: number;
  }>
): Promise<Winner> => {
  const promises = state.garageCars!.map(({ id }) => action(id));

  const winner = await raceAll(
    promises,
    state.garageCars!.map((car) => car.id)
  );

  return winner;
};
