import { createCar } from './apiRequests';
import { generateCar } from './elem-generators';
import { Store } from './store';

export const handleCreateBtnClick = async (): Promise<void> => {
  const createInputName = document.querySelector('#create-name');
  const createInputColor = document.querySelector('#create-color');

  if (createInputName && createInputColor) {
    const car = {
      name: (createInputName as HTMLInputElement).value,
      color: (createInputColor as HTMLInputElement).value,
    };

    const res = await createCar(car);

    Store.state.garageCars.push({
      id: res.id,
      name: res.name,
      color: res.color,
      position: 0,
      bestTime: 0,
      wins: 0,
      isEngineStarted: false,
    });

    const garageCarsList = document.querySelector('.garage-cars-list');

    if (garageCarsList) {
      garageCarsList.innerHTML += generateCar({
        id: res.id,
        name: res.name,
        color: res.color,
        isEngineStarted: false,
      });
    }
  }
};
