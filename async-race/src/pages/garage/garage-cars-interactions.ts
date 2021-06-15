import { BaseComponent } from '../../components/base-component';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { addCar, updateCar } from '../../shared/apiRequests';
import { state } from '../../shared/state';
import { race } from '../../shared/utils';
// import { race } from '../../shared/utils';
import { pagination } from '../pagination';
import { garage } from './garage';

export class GarageCarsInteractions extends BaseComponent {
  createUpdateButtonsWrap: BaseComponent;
  createForm: BaseComponent;
  createInputName: Input;
  createInputColor: Input;
  createBtn: Button;
  updateForm: BaseComponent;
  updateInputName: Input;
  updateInputColor: Input;
  updateBtn: Button;
  raceControls: BaseComponent;
  raceBtn: Button;
  resetBtn: Button;
  generateBtn: Button;

  constructor() {
    super('div', ['garage-cars-interactions']);

    this.createUpdateButtonsWrap = new BaseComponent('div', ['create-update-buttons-wrap']);
    this.createForm = new BaseComponent('form', ['form'], 'create-form');
    this.createInputName = new Input(['input'], 'create-name', 'text', 'name');
    this.createInputColor = new Input(['input'], 'create-color', 'color', 'color');
    this.createBtn = new Button('Create', ['button', 'create-btn'], 'create-btn', 'submit');
    this.updateForm = new BaseComponent('form', ['form'], 'update-form');
    this.updateInputName = new Input(['input'], 'update-name', 'text', 'name');
    (this.updateInputName.elem as HTMLInputElement).disabled = true;
    this.updateInputColor = new Input(['input'], 'update-color', 'color', 'color');
    (this.updateInputColor.elem as HTMLInputElement).disabled = true;
    this.updateBtn = new Button('Update', ['button', 'update-btn'], 'update-btn', 'submit');
    (this.updateInputName.elem as HTMLButtonElement).disabled = true;
    this.raceControls = new BaseComponent('div', ['race-controls']);
    this.raceBtn = new Button('Race', ['button', 'race-button', 'primary'], 'race-btn');
    this.resetBtn = new Button('Reset', ['button', 'reset-button', 'primary'], 'reset-btn');
    this.generateBtn = new Button('Generate Cars', ['button', 'generator-button'], 'generator-btn');

    this.createBtn.elem.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleCreateBtnClick();
    });
    this.updateBtn.elem.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleUpdateBtnClick();
    });
    this.raceBtn.elem.addEventListener('click', this.handleRaceBtnClick);
  }

  render(): void {
    this.appendInto('.garage-view');
    this.createUpdateButtonsWrap.appendInto('.garage-view');
    this.createForm.appendInto('.create-update-buttons-wrap');
    this.createInputName.appendInto('#create-form');
    this.createInputColor.appendInto('#create-form');
    this.createBtn.appendInto('#create-form');
    this.updateForm.appendInto('.create-update-buttons-wrap');
    this.updateInputName.appendInto('#update-form');
    this.updateInputColor.appendInto('#update-form');
    this.updateBtn.appendInto('#update-form');
    this.raceControls.appendInto('.garage-view');
    this.raceBtn.appendInto('.race-controls');
    this.resetBtn.appendInto('.race-controls');
    this.generateBtn.appendInto('.race-controls');
  }

  handleCreateBtnClick = async (): Promise<void> => {
    const car = {
      name: (this.createInputName.elem as HTMLInputElement).value,
      color: (this.createInputColor.elem as HTMLInputElement).value,
    };

    await addCar(car);
    await state.updateGarageCars();
    pagination.updatePrevNextButtons();
    garage.render();

    (this.createInputName.elem as HTMLInputElement).value = '';
    (this.createInputColor.elem as HTMLInputElement).value = '#000000';
  };

  handleUpdateBtnClick = async (): Promise<void> => {
    const car = {
      name: (this.updateInputName.elem as HTMLInputElement).value,
      color: (this.updateInputColor.elem as HTMLInputElement).value,
    };

    if (state.selectedCar) {
      if (state.selectedCar.id) {
        await updateCar(state.selectedCar.id, car);
      }
    }
    await state.updateGarageCars();
    pagination.updatePrevNextButtons();
    garage.render();

    (this.updateInputName.elem as HTMLInputElement).disabled = true;
    (this.updateInputColor.elem as HTMLInputElement).disabled = true;
    (this.updateInputName.elem as HTMLButtonElement).disabled = true;
    state.selectedCar = null;
  };

  handleRaceBtnClick = async (): Promise<void> => {
    (this.raceBtn.elem as HTMLButtonElement).disabled = true;

    const winner = await race(garage.garageCars.startDriving);
    // await saveWinner(winner);
    const message = document.querySelector('.message');
    if (message) {
      message.innerHTML = `${winner.name} went first (${winner.time}s)!`;
      message.classList.toggle('visible', true);
    }
    (this.resetBtn.elem as HTMLButtonElement).disabled = false;
  };
}

export const garageCarsInteractions = new GarageCarsInteractions();
