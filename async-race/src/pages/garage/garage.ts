import { BaseComponent } from '../../components/base-component';
import { state } from '../../shared/state';
import { GarageCars, handleStartBtnClick, handleStopBtnClick } from './garage-cars';

export class Garage extends BaseComponent {
  garageTotalCars: BaseComponent;
  garagePage: BaseComponent;
  garageCars: GarageCars;
  message: BaseComponent;

  constructor() {
    super('div', undefined, 'garage');

    this.garageTotalCars = new BaseComponent('h1', ['garage-total-cars']);
    this.garagePage = new BaseComponent('h2', ['garage-page']);
    this.garageCars = new GarageCars();
    this.message = new BaseComponent('p', ['message']);
  }

  render(): void {
    this.appendInto('.garage-view');
    this.garageTotalCars.appendInto('#garage');
    this.garageTotalCars.elem.innerText = `Garage (${state.garageTotalCars})`;
    this.garagePage.appendInto('#garage');
    this.garagePage.elem.innerText = `Page #${state.garagePage}`;
    this.garageCars.appendInto('#garage');
    this.garageCars.render();
    this.message.appendInto('.garage-view');

    const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.select-button');
    selectCarButtonsElems.forEach((button) =>
      button.addEventListener('click', this.garageCars.handleSelectBtnClick)
    );
    const removeCarButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.remove-button');
    removeCarButtonsElems.forEach((button) =>
      button.addEventListener('click', this.garageCars.removeCar)
    );
    const startEngineButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.start-engine-button');
    startEngineButtonsElems.forEach((button) =>
      button.addEventListener('click', handleStartBtnClick)
    );
    const stopEngineButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.stop-engine-button');
    stopEngineButtonsElems.forEach((button) =>
      button.addEventListener('click', handleStopBtnClick)
    );
  }
}

export const garage = new Garage();
