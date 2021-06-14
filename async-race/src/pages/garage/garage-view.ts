import { BaseComponent } from '../../components/base-component';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { handleCreateBtnClick } from '../../shared/handlers';
import { Store } from '../../shared/store';
import { GarageCarsList } from './garage-cars-list';

export class GarageView extends BaseComponent {
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
  garage: BaseComponent;
  garageTotalCars: BaseComponent;
  garagePage: BaseComponent;
  garageCarsList: GarageCarsList;
  message: BaseComponent;

  constructor() {
    super('div', ['garage-view']);

    this.createUpdateButtonsWrap = new BaseComponent('div', ['create-update-buttons-wrap']);
    this.createForm = new BaseComponent('form', ['form'], 'create-form');
    this.createInputName = new Input(['input'], 'create-name', 'text', 'name');
    this.createInputColor = new Input(['input'], 'create-color', 'color', 'color');
    this.createBtn = new Button('Create', ['button', 'create-btn'], 'create-btn', 'submit');

    this.createBtn.elem.addEventListener('click', (event) => {
      event.preventDefault();
      handleCreateBtnClick();
    });

    this.updateForm = new BaseComponent('form', ['form'], 'update-form');
    this.updateInputName = new Input(['input'], 'update-name', 'text', 'name');
    this.updateInputColor = new Input(['input'], 'update-color', 'color', 'color');
    this.updateBtn = new Button('Update', ['button', 'update-btn'], 'update-btn', 'submit');
    this.raceControls = new BaseComponent('div', ['race-controls']);
    this.raceBtn = new Button('Race', ['button', 'race-button', 'primary'], 'race-btn');
    this.resetBtn = new Button('Reset', ['button', 'reset-button', 'primary'], 'reset-btn');
    this.generateBtn = new Button('Generate Cars', ['button', 'generator-button'], 'generator-btn');
    this.garage = new BaseComponent('div', undefined, 'garage');
    this.garageTotalCars = new BaseComponent('h1', ['garage-total-cars']);
    this.garageTotalCars.elem.innerText = `Garage (${Store.state.garageTotalCars})`;
    this.garagePage = new BaseComponent('h2', ['garage-page']);
    this.garagePage.elem.innerText = `Page #${Store.state.garagePage}`;
    this.garageCarsList = new GarageCarsList();
    this.message = new BaseComponent('p', ['message']);
  }

  renderGarageView(): void {
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
    this.garage.appendInto('.garage-view');
    this.garageTotalCars.appendInto('#garage');
    this.garagePage.appendInto('#garage');
    this.garageCarsList.appendInto('#garage');
    this.garageCarsList.renderGarage();
    this.message.appendInto('.garage-view');
  }
}
