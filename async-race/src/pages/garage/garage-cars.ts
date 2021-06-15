import { BaseComponent } from '../../components/base-component';
import { deleteCar, drive, getCar, startEngine, stopEngine } from '../../shared/apiRequests';
import { generateCar } from '../../shared/elem-generators';
import { state } from '../../shared/state';
import { animation, getDistance } from '../../shared/utils';
import { pagination } from '../pagination';
import { garage } from './garage';

export class GarageCars extends BaseComponent {
  constructor() {
    super('ul', ['garage-cars-list']);
  }

  render(): void {
    if (state.garageCars) {
      const htmlStr = state.garageCars
        .map((car) =>
          generateCar({ id: car.id, name: car.name, color: car.color, isEngineStarted: false })
        )
        .join('');
      this.elem.innerHTML = htmlStr;
    }
    pagination.updatePrevNextButtons();
  }

  handleSelectBtnClick = async (event: Event): Promise<void> => {
    state.selectedCar = await getCar(
      (event.target as HTMLButtonElement).id.split('select-car-')[1]
    );

    const updateCarInputNameElem: HTMLInputElement | null = document.querySelector('#update-name');
    const updateCarInputColorElem: HTMLInputElement | null =
      document.querySelector('#update-color');
    const updateCarBtnElem: HTMLButtonElement | null = document.querySelector('.update-btn');

    if (updateCarInputNameElem && updateCarInputColorElem && updateCarBtnElem) {
      updateCarInputNameElem.value = state.selectedCar.name;
      updateCarInputColorElem.value = state.selectedCar.color;
      updateCarInputNameElem.disabled = false;
      updateCarInputColorElem.disabled = false;
      updateCarBtnElem.disabled = false;
    }
  };

  startDriving = async (id: number): Promise<{ success: boolean; id: number; time: number }> => {
    const startButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;

    startButton!.disabled = true;
    startButton!.classList.toggle('enabling', true);

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);

    startButton?.classList.toggle('enabling', false);

    const stopButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stopButton.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;
    const htmlDistance = Math.floor(getDistance(car, flag)) + 100;

    state.animation[id] = animation(car, htmlDistance, time);

    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(state.animation[id].id);

    return { success, id, time };
  };

  stopDriving = async (id: number): Promise<void> => {
    const stopButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;

    stopButton.disabled = true;
    stopButton.classList.toggle('enabling', true);

    await stopEngine(id);

    stopButton.classList.toggle('enabling', false);

    const startButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    startButton.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = `translateX(0)`;

    if (state.animation[id]) window.cancelAnimationFrame(state.animation[id].id);
  };

  removeCar = async (event: Event): Promise<void> => {
    const id = +(event.target as HTMLButtonElement).id.split('remove-car-')[1];

    await deleteCar(id);
    // await deleteWinner(id);
    await state.updateGarageCars();
    garage.render();
  };
}

export function handleStartBtnClick(event: Event): void {
  if (event?.target) {
    const id = +(event.target as HTMLButtonElement).id.split('start-engine-car-')[1];
    if (id) garage.garageCars.startDriving(id);
  }
}

export function handleStopBtnClick(event: Event): void {
  if (event?.target) {
    const id = +(event.target as HTMLButtonElement).id.split('stop-engine-car-')[1];
    garage.garageCars.stopDriving(id);
  }
}
