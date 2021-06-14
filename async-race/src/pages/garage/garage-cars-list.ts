// import { carSvg } from '../../../public/car-svg';
import { BaseComponent } from '../../components/base-component';
import { getCarImage, Store } from '../../shared/store';

export class GarageCarsList extends BaseComponent {
  constructor() {
    super('ul', ['garage-cars-list']);
  }

  renderGarage(): void {
    this.elem.innerHTML = `
      ${Store.state.garageCars
        .map(
          (car) => `
        <li>
          <div class="general-buttons">
            <button class="button select-button" id="select-car-${car.id}">Select</button>
            <button class="button remove-button" id="remove-car-${car.id}">Remove</button>
            <span class="car-name">${car.brand} ${car.model}</span>
          </div>
          <div class="road">
            <div class="launch-pad">
              <div class="control-panel">
                <button class="icon start-engine-button" id="start-engine-car-${car.id}" ${
            car.isEngineStarted ? 'disabled' : ''
          }>A</button>
                <button button class="icon stop-engine-button" id="stop-engine-car-${car.id}" ${
            !car.isEngineStarted ? 'disabled' : ''
          }>B</button>
              </div>
              <div class="car" id="car-${car.id}">
                ${getCarImage(car.color)}
              </div>
            </div>
            <div class="flag" id="flag-${car.id}">🚩</div>
          </div>
        </li>
      `
        )
        .join('')}`;
  }
}
