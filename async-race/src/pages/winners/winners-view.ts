import { app } from '../..';
import { BaseComponent } from '../../components/base-component';
import { state } from '../../state/state';
import { WinnersTable } from './winners-table';

export class WinnersView extends BaseComponent {
  totalCars: BaseComponent;
  currentPage: BaseComponent;
  winnersTable: WinnersTable;

  constructor() {
    super('div', ['winners-view']);

    this.elem.style.display = 'none';
    this.totalCars = new BaseComponent('h1', ['winners-total-cars']);
    this.currentPage = new BaseComponent('h2', ['winners-page']);
    this.winnersTable = new WinnersTable();
  }

  render(): void {
    this.appendInto('.winners-view-wrap');
    this.totalCars.appendInto('.winners-view');
    this.totalCars.elem.innerText = `Winners (${state.winnersTotalCars})`;
    this.currentPage.appendInto('.winners-view');
    this.currentPage.elem.innerText = `Page #${state.winnersPage}`;
    this.winnersTable.appendInto('.winners-view');
    this.winnersTable.render();

    app.pagination.updateButtonsView();
  }
}

export const winnersView = new WinnersView();
