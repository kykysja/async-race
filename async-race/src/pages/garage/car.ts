import { request } from '../../api/api-requests';
import { CarInfo, Success } from '../../shared/types';
import { Utils } from '../../shared/utils';
import { state } from '../../state/state';
import { carSvg } from './car-svg';
import { garageView } from './garage-view';

export abstract class Car {
  static generateCarImage = (color: string): string => carSvg(color);

  static generateCar = (car: CarInfo): string => `
    <li>
      <div class="general-buttons">
        <button class="button select-button" id="select-car-${car.id}">Select</button>
        <button class="button remove-button" id="remove-car-${car.id}">Remove</button>
        <span class="car-name">${car.name}</span>
        <span class="flag">🚩</span>
      </div>
      <div class="road">
        <div class="launch-pad">
          <div class="control-panel">
            <button class="icon start-engine-button" id="start-engine-car-${car.id}"
              ${car.isEngineStarted ? 'disabled' : ''}>A
            </button>
            <button button class="icon stop-engine-button" id="stop-engine-car-${car.id}"
              ${!car.isEngineStarted ? 'disabled' : ''}>B
            </button>
          </div>
          <div class="car" id="car-${car.id}">
            ${Car.generateCarImage(car.color)}
          </div>
        </div>

        <div class="flag-hidden" id="flag-${car.id}">🚩</div>
      </div>
    </li>
  `;

  static select = async (event: Event): Promise<void> => {
    state.selectedCar = await request.getCar(
      +(event.target as HTMLButtonElement).id.split('select-car-')[1]
    );

    garageView.carsInteractions.updateInputName.elem.value = state.selectedCar.name;
    garageView.carsInteractions.updateInputColor.elem.value = state.selectedCar.color;
    garageView.carsInteractions.updateInputName.elem.disabled = false;
    garageView.carsInteractions.updateInputColor.elem.disabled = false;
    garageView.carsInteractions.updateBtn.elem.disabled = false;
  };

  static startDriving = async (id: number): Promise<Success> => {
    const startButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;

    startButton.disabled = true;
    startButton.classList.toggle('enabling', true);

    const { velocity, distance } = await request.startEngine(id);
    const time = Math.round(distance / velocity);

    startButton?.classList.toggle('enabling', false);

    const stopButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stopButton.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;
    const htmlDistance = Math.floor(Utils.getDistance(car, flag)) + 100;

    state.animation[id] = Utils.animation(car, htmlDistance, time);

    const { success } = await request.drive(id);
    if (!success) window.cancelAnimationFrame(state.animation[id].id);

    return { success, id, time };
  };

  static stopDriving = async (id: number): Promise<void> => {
    const stopButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;

    stopButton.disabled = true;
    stopButton.classList.toggle('enabling', true);

    await request.stopEngine(id);

    stopButton.classList.toggle('enabling', false);

    const startButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    startButton.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = `translateX(0)`;

    if (state.animation[id]) window.cancelAnimationFrame(state.animation[id].id);
  };

  static remove = async (event: Event): Promise<void> => {
    const id = +(event.target as HTMLButtonElement).id.split('remove-car-')[1];

    await request.deleteCar(id);
    await request.deleteWinner(id);
    await request.updateGarageCars();
    garageView.garage.render();
  };

  static handleStartBtnClick(event: Event): void {
    if (event?.target) {
      const id = +(event.target as HTMLButtonElement).id.split('start-engine-car-')[1];
      if (id) Car.startDriving(id);
    }
  }

  static handleStopBtnClick(event: Event): void {
    if (event?.target) {
      const id = +(event.target as HTMLButtonElement).id.split('stop-engine-car-')[1];
      Car.stopDriving(id);
    }
  }
}
