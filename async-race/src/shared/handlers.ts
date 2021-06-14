/* import { garage } from '../pages/garage/garage';
import { pagination } from '../pages/pagination';
// import { pagination } from '../pages/pagination';
import { addCar } from './apiRequests';
import { state } from './state'; */

// let selectedCar: Car | null = null;

/* export function handlePaginationButtonsView(): void {
  if (state.garagePage * 7 < state.garageTotalCars) {
    (pagination.nextBtn.elem as HTMLButtonElement).disabled = false;
  } else {
    (pagination.nextBtn.elem as HTMLButtonElement).disabled = true;
  }
  if (state.garagePage > 1) {
    (pagination.prevBtn.elem as HTMLButtonElement).disabled = false;
  } else {
    (pagination.prevBtn.elem as HTMLButtonElement).disabled = true;
  }
} */

/* export const handleSelectBtnClick = async (event: Event): Promise<void> => {
  if (event.target) {
    selectedCar = await getCar((event.target as HTMLButtonElement).id.split('select-car-')[1]);
  }

  const updateCarInputNameElem: HTMLInputElement | null = document.querySelector('#update-name');
  const updateCarInputColorElem: HTMLInputElement | null = document.querySelector('#update-color');
  const updateCarBtnElem: HTMLButtonElement | null = document.querySelector('.update-btn');

  if (selectedCar) {
    if (updateCarInputNameElem && updateCarInputColorElem && updateCarBtnElem) {
      updateCarInputNameElem.value = selectedCar.name;
      updateCarInputColorElem.value = selectedCar.color;
      updateCarInputNameElem.disabled = false;
      updateCarInputColorElem.disabled = false;
      updateCarBtnElem.disabled = false;
    }
  }
}; */

/* export const handleCreateBtnClick = async (): Promise<void> => {
  const createCarInputNameElem: HTMLInputElement | null = document.querySelector('#create-name');
  const createCarInputColorElem: HTMLInputElement | null = document.querySelector('#create-color');

  if (createCarInputNameElem && createCarInputColorElem) {
    if (createCarInputNameElem.value && createCarInputColorElem.value) {
      const car = {
        name: createCarInputNameElem.value,
        color: createCarInputColorElem.value,
      };

      await addCar(car);
      await state.updateGarageCars();
      pagination.updatePrevNextButtonsView();
      garage.render();

      const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
        document.querySelectorAll('.select-button');

      selectCarButtonsElems.forEach((button) =>
        button.addEventListener('click', garage.garageCars.handleSelectBtnClick)
      );

      createCarInputNameElem.value = '';
      createCarInputColorElem.value = '#000000';
    }
  }
}; */

/* export const handleUpdateBtnClick = async (): Promise<void> => {
  const updateCarInputNameElem: HTMLInputElement | null = document.querySelector('#update-name');
  const updateCarInputColorElem: HTMLInputElement | null = document.querySelector('#update-color');
  const updateCarBtnElem: HTMLButtonElement | null = document.querySelector('.update-btn');

  if (updateCarInputNameElem && updateCarInputColorElem && updateCarBtnElem) {
    if (updateCarInputNameElem.value && updateCarInputColorElem.value) {
      const car = {
        name: updateCarInputNameElem.value,
        color: updateCarInputColorElem.value,
      };
      if (selectedCar) {
        if (selectedCar.id) {
          await updateCar(selectedCar.id, car);
        }
      }
      await state.updateGarageCars();
      pagination.updatePrevNextButtonsView();
      garage.render();

      updateCarInputNameElem.disabled = true;
      updateCarInputColorElem.disabled = true;
      updateCarBtnElem.disabled = true;
      selectedCar = null;
    }
  }
}; */

/* export const handleNextPageBtnClick = async (): Promise<void> => {
  if (state.view === 'garage') {
    state.garagePage++;
    await state.updateGarageCars();
    garage.render();
    const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.select-button');

    selectCarButtonsElems.forEach((button) =>
      button.addEventListener('click', handleSelectBtnClick)
    );
    // document.getElementById('garage').innerHTML = renderGarage();
    // break;
  }
}; */
