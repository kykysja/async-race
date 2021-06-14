import { BaseComponent } from '../../components/base-component';
import { generateCar } from '../../shared/elem-generators';
import { Store } from '../../shared/store';

export class GarageCarsList extends BaseComponent {
  constructor() {
    super('ul', ['garage-cars-list']);
  }

  renderGarage(): void {
    const htmlStr = Store.state.garageCars
      .map((car) =>
        generateCar({ id: car.id, name: car.name, color: car.color, isEngineStarted: false })
      )
      .join('');
    this.elem.innerHTML = htmlStr;
  }
}
