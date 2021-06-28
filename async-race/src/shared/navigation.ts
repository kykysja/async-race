// import { app } from '..';
import { app } from '..';
import { api } from '../api/api-requests';
import { BaseComponent } from '../components/base-component';
import { Button } from '../components/button';
import { garageView } from '../pages/garage/garage-view';
import { winnersView } from '../pages/winners/winners-view';
import { state } from '../state/state';

export class Navigation extends BaseComponent {
  garageViewBtn: Button;
  winnersViewBtn: Button;

  constructor() {
    super('nav', ['navigation']);

    this.garageViewBtn = new Button(
      'To garage',
      ['button', 'garage-menu-button', 'primary'],
      'garage-menu'
    );

    this.winnersViewBtn = new Button(
      'To winners',
      ['button', 'winners-menu-button', 'primary'],
      'winners-menu'
    );

    this.garageViewBtn.elem.addEventListener('click', (): void => {
      winnersView.elem.style.display = 'none';
      garageView.elem.style.display = 'block';
      state.view = 'garage';
      app.pagination.updateButtonsView();
    });

    this.winnersViewBtn.elem.addEventListener('click', async (): Promise<void> => {
      garageView.elem.style.display = 'none';
      winnersView.elem.style.display = 'block';

      await api.updateWinnersCars();
      state.view = 'wins';
      winnersView.render();
    });
  }

  render(): void {
    this.appendInto('.navigation-wrap');
    this.garageViewBtn.appendInto('.navigation');
    this.winnersViewBtn.appendInto('.navigation');
  }
}
