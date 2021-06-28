import { app } from '../..';
import { BaseComponent } from '../../components/base-component';
import { state } from '../../state/state';
import { Car } from './car';

export class Cars extends BaseComponent {
  constructor() {
    super('ul', ['garage-cars']);
  }

  render(): void {
    if (state.garageCars) {
      const html = state.garageCars
        .map((car) =>
          Car.generateCarTemplate({
            id: car.id,
            name: car.name,
            color: car.color,
            isEngineStarted: false,
          })
        )
        .join('');
      this.elem.innerHTML = html;
    }
    app.pagination.updateButtonsView();
  }
}
