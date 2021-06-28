import './style.css';

import { App } from './app';
import { garageView } from './pages/garage/garage-view';
import { winnersView } from './pages/winners/winners-view';
import { api } from './api/api-requests';

export const app = new App();

window.onload = async () => {
  await api.updateGarageCars();
  app.render();
  app.navigation.render();
  garageView.render();
  winnersView.render();
  app.pagination.updateButtonsView();
};
