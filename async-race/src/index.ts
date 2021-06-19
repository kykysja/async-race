import './style.css';

import { App } from './app';
import { garageView } from './pages/garage/garage-view';
import { winnersView } from './pages/winners/winners-view';
import { request } from './api/api-requests';

export const app = new App();

window.onload = async () => {
  await request.updateGarageCars();
  app.render();
  app.navigation.render();
  garageView.render();
  winnersView.render();
  app.pagination.updateButtonsView(7);
};
