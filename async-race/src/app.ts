import { BaseComponent } from './components/base-component';
import { Button } from './components/button';
import { GarageView } from './pages/garage/garage-view';
import { WinnersView } from './pages/winners/winners-view';

export class App extends BaseComponent {
  pageNavButtonsWrap: BaseComponent;
  garageBtn: Button;
  winnersBtn: Button;
  garageView: GarageView;
  winnersView: WinnersView;
  pagination: BaseComponent;

  constructor() {
    super('div', ['root-app']);

    this.pageNavButtonsWrap = new BaseComponent('nav', ['page-nav-buttons-wrap']);

    this.garageBtn = new Button(
      'To garage',
      ['button', 'garage-menu-button', 'primary'],
      'garage-menu'
    );
    this.garageBtn.elem.addEventListener('click', () => {
      this.winnersView.elem.style.display = 'none';
      this.garageView.elem.style.display = 'block';
      this.garageView.renderGarageView();
    });

    this.winnersBtn = new Button(
      'To winners',
      ['button', 'winners-menu-button', 'primary'],
      'winners-menu'
    );
    this.winnersBtn.elem.addEventListener('click', () => {
      this.garageView.elem.style.display = 'none';
      this.winnersView.elem.style.display = 'block';
      this.winnersView.renderWinnersView();
    });

    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
    this.pagination = new BaseComponent('div', ['pagination']);
  }

  render(): void {
    this.appendInto('body');
    this.pageNavButtonsWrap.appendInto('.root-app');
    this.garageBtn.appendInto('.page-nav-buttons-wrap');
    this.winnersBtn.appendInto('.page-nav-buttons-wrap');
    this.garageView.appendInto('.root-app');
    this.garageView.renderGarageView();
    this.winnersView.appendInto('.root-app');
    this.pagination.appendInto('.root-app');
  }
}

/* <button class="button prev-button primary" id="prev" disabled="">Prev</button>
        <button class="button next-button primary" id="next" disabled="">Next</button> */
