import { BaseComponent } from '../components/base-component';
import { Button } from '../components/button';
import { garageView } from './garage/garage-view';
import { winnersView } from './winners/winners-view';

export class PageNavigationButtons extends BaseComponent {
  garageViewBtn: Button;
  winnersViewBtn: Button;

  constructor() {
    super('nav', ['page-nav-buttons']);

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
    this.garageViewBtn.elem.addEventListener('click', () => {
      winnersView.elem.style.display = 'none';
      garageView.elem.style.display = 'block';
      garageView.render();
    });
    this.winnersViewBtn.elem.addEventListener('click', () => {
      garageView.elem.style.display = 'none';
      winnersView.elem.style.display = 'block';
      winnersView.render();
    });
  }

  render(): void {
    this.appendInto('.page-nav-buttons-wrap');
    this.garageViewBtn.appendInto('.page-nav-buttons-wrap');
    this.winnersViewBtn.appendInto('.page-nav-buttons-wrap');
  }
}

export const pageNavigationButtons = new PageNavigationButtons();
