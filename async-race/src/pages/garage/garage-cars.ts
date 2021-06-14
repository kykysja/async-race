import { BaseComponent } from '../../components/base-component';
import { getCar } from '../../shared/apiRequests';
import { generateCar } from '../../shared/elem-generators';
import { state } from '../../shared/state';

export class GarageCars extends BaseComponent {
  constructor() {
    super('ul', ['garage-cars-list']);
  }

  render(): void {
    if (state.garageCars) {
      const htmlStr = state.garageCars
        .map((car) =>
          generateCar({ id: car.id, name: car.name, color: car.color, isEngineStarted: false })
        )
        .join('');
      this.elem.innerHTML = htmlStr;
    }
  }

  handleSelectBtnClick = async (event: Event): Promise<void> => {
    if (event.target) {
      state.selectedCar = await getCar(
        (event.target as HTMLButtonElement).id.split('select-car-')[1]
      );
    }

    const updateCarInputNameElem: HTMLInputElement | null = document.querySelector('#update-name');
    const updateCarInputColorElem: HTMLInputElement | null =
      document.querySelector('#update-color');
    const updateCarBtnElem: HTMLButtonElement | null = document.querySelector('.update-btn');

    if (state.selectedCar) {
      if (updateCarInputNameElem && updateCarInputColorElem && updateCarBtnElem) {
        updateCarInputNameElem.value = state.selectedCar.name;
        updateCarInputColorElem.value = state.selectedCar.color;
        updateCarInputNameElem.disabled = false;
        updateCarInputColorElem.disabled = false;
        updateCarBtnElem.disabled = false;
      }
    }
  };
}
