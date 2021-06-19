import { BaseComponent } from '../../components/base-component';
import { state } from '../../state/state';
import { Car } from './car';
import { Cars } from './cars';

export class Garage extends BaseComponent {
  totalCars: BaseComponent;
  currentPage: BaseComponent;
  cars: Cars;

  constructor() {
    super('div', ['garage'], 'garage');

    this.totalCars = new BaseComponent('h1', ['garage-total-cars']);
    this.currentPage = new BaseComponent('h2', ['garage-page']);
    this.cars = new Cars();
  }

  render(): void {
    this.appendInto('.garage-view');
    this.totalCars.appendInto('.garage');
    this.totalCars.elem.innerText = `Garage (${state.garageTotalCars})`;
    this.currentPage.appendInto('.garage');
    this.currentPage.elem.innerText = `Page #${state.garagePage}`;
    this.cars.appendInto('.garage');
    this.cars.render();

    const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.select-button');
    selectCarButtonsElems.forEach((button) => button.addEventListener('click', Car.select));

    const removeCarButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.remove-button');
    removeCarButtonsElems.forEach((button) => button.addEventListener('click', Car.remove));

    const startEngineButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.start-engine-button');
    startEngineButtonsElems.forEach((button) =>
      button.addEventListener('click', Car.handleStartBtnClick)
    );
    const stopEngineButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.stop-engine-button');
    stopEngineButtonsElems.forEach((button) =>
      button.addEventListener('click', Car.handleStopBtnClick)
    );
  }
}
