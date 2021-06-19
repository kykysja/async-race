import { BaseComponent } from '../../components/base-component';
import { CarsInteractions } from './cars-interactions';
import { Garage } from './garage';
import { WinsMessage } from './wins-message';

export class GarageView extends BaseComponent {
  carsInteractions: CarsInteractions;
  garage: Garage;
  message: WinsMessage;

  constructor() {
    super('div', ['garage-view']);

    this.carsInteractions = new CarsInteractions();
    this.garage = new Garage();
    this.message = new WinsMessage();
  }

  render(): void {
    this.appendInto('.garage-view-wrap');
    this.carsInteractions.appendInto('.garage-view');
    this.carsInteractions.render();
    this.garage.appendInto('.garage-view');
    this.garage.render();
    this.message.appendInto('.garage-view');
  }
}

export const garageView = new GarageView();
