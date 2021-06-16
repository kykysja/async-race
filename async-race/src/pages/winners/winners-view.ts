import { BaseComponent } from '../../components/base-component';
import { WinnersTable } from '../../components/table';
import { state } from '../../shared/state';
import { pagination } from '../pagination';

export class WinnersView extends BaseComponent {
  winnersTotalCars: BaseComponent;
  winnersPage: BaseComponent;
  winnersTable: WinnersTable;

  constructor() {
    super('div', ['winners-view']);

    this.elem.style.display = 'none';
    this.winnersTotalCars = new BaseComponent('h1', ['winners-total-cars']);
    this.winnersPage = new BaseComponent('h2', ['winners-page']);
    this.winnersTable = new WinnersTable();
  }

  render(): void {
    this.appendInto('.winners-view-wrap');
    this.winnersTotalCars.appendInto('.winners-view');
    this.winnersTotalCars.elem.innerText = `Winners (${state.winnersTotalCars})`;
    this.winnersPage.appendInto('.winners-view');
    this.winnersPage.elem.innerText = `Page #${state.winnersPage}`;
    this.winnersTable.appendInto('.winners-view');
    this.winnersTable.render();
    pagination.updatePrevNextButtons();
  }
}

export const winnersView = new WinnersView();
