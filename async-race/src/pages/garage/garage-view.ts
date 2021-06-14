import { BaseComponent } from '../../components/base-component';

export class GarageView extends BaseComponent {
  constructor() {
    super('div', ['garage-view']);
  }

  render(): void {
    this.appendInto('.garage-view-wrap');
  }
}

export const garageView = new GarageView();
