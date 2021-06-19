import { state } from '../state/state';
import { WinnerRaceAll } from './types';

export abstract class Utils {
  static models = [
    'Tesla',
    'Mersedes',
    'BMW',
    'Toyota',
    'Opel',
    'Aston Martin',
    'Porshe',
    'Ford',
    'Lanos',
  ];

  static names = ['Model S', 'CLK', '7', 'Camry', 'Combi', '9', 'Corsa', 'DB9', 'Cayene'];

  static getRandomName = (): string => {
    const model = Utils.models[Math.floor(Math.random() * Utils.models.length)];
    const name = Utils.names[Math.floor(Math.random() * Utils.models.length)];

    return `${model} ${name}`;
  };

  static getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  static generateRandonCars = (count = 100): { name: string; color: string }[] =>
    new Array(count)
      .fill(1)
      .map(() => ({ name: Utils.getRandomName(), color: Utils.getRandomColor() }));

  static getPosition(element: HTMLElement): { x: number; y: number } {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  static getDistance(a: HTMLElement, b: HTMLElement): number {
    const aPosition = Utils.getPosition(a);
    const bPosition = Utils.getPosition(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  }

  static animation(car: HTMLElement, distance: number, animationTime: number): { id: number } {
    let start: number | null = null;
    const store: { id: number } = { id: 0 };

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

  static raceAll = async (
    promises: Promise<{
      success: boolean;
      id: number;
      time: number;
    }>[],
    ids: number[]
  ): Promise<WinnerRaceAll> => {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.findIndex((i) => i === id);
      const restPromises = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return Utils.raceAll(restPromises, restIds);
    }

    return { ...state.garageCars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
  };

  static race = async (
    action: (id: number) => Promise<{
      success: boolean;
      id: number;
      time: number;
    }>
  ): Promise<WinnerRaceAll> => {
    const promises = state.garageCars.map(({ id }) => action(id));

    const winner = await Utils.raceAll(
      promises,
      state.garageCars.map((car) => car.id)
    );

    return winner;
  };
}
