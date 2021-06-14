import './style.css';

import { App } from './app';
import { state } from './shared/state';
import { garageView } from './pages/garage/garage-view';
import { winnersView } from './pages/winners/winners-view';
import { pagination } from './pages/pagination';
import { pageNavigationButtons } from './pages/page-navigation-buttons';
import { garageCarsInteractions } from './pages/garage/garage-cars-interactions';
import { garage } from './pages/garage/garage';

export const app = new App();

window.onload = async () => {
  await state.updateGarageCars();
  app.render();
  pageNavigationButtons.render();
  garageView.render();
  garageCarsInteractions.render();
  garage.render();
  const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.select-button');

  selectCarButtonsElems.forEach((button) =>
    button.addEventListener('click', garage.garageCars.handleSelectBtnClick)
  );
  winnersView.render();
  pagination.render();
  pagination.updatePrevNextButtonsView();
};
