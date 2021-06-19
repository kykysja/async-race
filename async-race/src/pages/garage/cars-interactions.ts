import { app } from '../..';
import { request } from '../../api/api-requests';
import { BaseComponent } from '../../components/base-component';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Winner } from '../../shared/types';
import { Utils } from '../../shared/utils';
import { state } from '../../state/state';
import { Car } from './car';
import { garageView } from './garage-view';

export class CarsInteractions extends BaseComponent {
  createForm: BaseComponent;
  createInputName: Input;
  createInputColor: Input;
  createBtn: Button;

  updateForm: BaseComponent;
  updateInputName: Input;
  updateInputColor: Input;
  updateBtn: Button;

  raceBtn: Button;
  resetBtn: Button;
  generateBtn: Button;

  constructor() {
    super('div', ['cars-interactions']);

    this.elem.innerHTML = `
      <div class='create-update-wrap'></div>
      <div class='race-controls'></div>
    `;

    this.createForm = new BaseComponent('form', ['form'], 'create-form');
    this.createInputName = new Input(['input'], 'create-name', 'text', 'name');
    this.createInputColor = new Input(['input'], 'create-color', 'color', 'color');
    this.createBtn = new Button('Create', ['button', 'create-btn'], 'create-btn', 'submit');

    this.updateForm = new BaseComponent('form', ['form'], 'update-form');
    this.updateInputName = new Input(['input'], 'update-name', 'text', 'name');
    this.updateInputName.elem.disabled = true;
    this.updateInputColor = new Input(['input'], 'update-color', 'color', 'color');
    this.updateInputColor.elem.disabled = true;
    this.updateBtn = new Button('Update', ['button', 'update-btn'], 'update-btn', 'submit');
    this.updateBtn.elem.disabled = true;

    this.raceBtn = new Button('Race', ['button', 'race-button', 'primary'], 'race-btn');
    this.resetBtn = new Button('Reset', ['button', 'reset-button', 'primary'], 'reset-btn');
    this.resetBtn.elem.disabled = true;
    this.generateBtn = new Button('Generate Cars', ['button', 'generator-button'], 'generator-btn');

    this.createBtn.elem.addEventListener('click', (event) => {
      event.preventDefault();
      this.createCar();
    });
    this.updateBtn.elem.addEventListener('click', (event) => {
      event.preventDefault();
      this.updateCar();
    });
  }

  render(): void {
    this.appendInto('.garage-view');

    this.createForm.appendInto('.create-update-wrap');
    this.createInputName.appendInto('#create-form');
    this.createInputColor.appendInto('#create-form');
    this.createBtn.appendInto('#create-form');

    this.updateForm.appendInto('.create-update-wrap');
    this.updateInputName.appendInto('#update-form');
    this.updateInputColor.appendInto('#update-form');
    this.updateBtn.appendInto('#update-form');

    this.raceBtn.appendInto('.race-controls');
    this.resetBtn.appendInto('.race-controls');
    this.generateBtn.appendInto('.race-controls');

    this.raceBtn.elem.addEventListener('click', this.startRacing);
    this.resetBtn.elem.addEventListener('click', this.resetRacing);
    this.generateBtn.elem.addEventListener('click', this.generateCars);
  }

  createCar = async (): Promise<void> => {
    const car = {
      name: this.createInputName.elem.value,
      color: this.createInputColor.elem.value,
    };

    await request.addCar(car);
    await request.updateGarageCars();
    app.pagination.updateButtonsView(7);
    garageView.garage.render();

    this.createInputName.elem.value = '';
    this.createInputColor.elem.value = '#000000';
  };

  updateCar = async (): Promise<void> => {
    const car = {
      name: this.updateInputName.elem.value,
      color: this.updateInputColor.elem.value,
    };

    if (state.selectedCar) {
      if (state.selectedCar.id) {
        await request.updateCar(state.selectedCar.id, car);
      }
    }
    await request.updateGarageCars();
    app.pagination.updateButtonsView(7);
    garageView.garage.render();

    this.updateInputName.elem.disabled = true;
    this.updateInputColor.elem.disabled = true;
    this.updateBtn.elem.disabled = true;

    this.updateInputName.elem.value = '';
    this.updateInputColor.elem.value = '';
    this.updateInputName.elem.value = '';

    state.selectedCar = null;
  };

  startRacing = async (): Promise<void> => {
    this.raceBtn.elem.disabled = true;
    this.resetBtn.elem.disabled = false;

    const winner = await Utils.race(Car.startDriving);
    if (winner.id) await request.saveWinner(winner.id, winner.time);

    garageView.message.render(winner as Winner);
    garageView.message.elem.classList.toggle('visible', true);
  };

  resetRacing = (): void => {
    this.resetBtn.elem.disabled = true;

    state.garageCars.map(({ id }) => Car.stopDriving(id));

    garageView.message.elem.classList.toggle('visible', false);

    this.raceBtn.elem.disabled = false;
  };

  generateCars = async (): Promise<void> => {
    this.generateBtn.elem.disabled = true;
    const cars = Utils.generateRandonCars();

    await Promise.all(
      cars.map(async (c) => {
        await request.addCar(c);
      })
    );

    await request.updateGarageCars();

    garageView.garage.render();
    this.generateBtn.elem.disabled = false;
  };
}
