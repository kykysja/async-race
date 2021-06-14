import { BaseComponent } from '../../components/base-component';
import { Table } from '../../components/table';
import { state } from '../../shared/state';

export class WinnersView extends BaseComponent {
  winnersTotalCars: BaseComponent;
  winnersPage: BaseComponent;
  winnersTable: Table;

  constructor() {
    super('div', ['winners-view']);

    this.elem.style.display = 'none';

    this.winnersTotalCars = new BaseComponent('h1', ['winners-total-cars']);
    this.winnersTotalCars.elem.innerText = `Winners (${state.winnersTotalCars})`;
    this.winnersPage = new BaseComponent('h2', ['winners-page']);
    this.winnersPage.elem.innerText = `Page #${state.winnersPage}`;
    this.winnersTable = new Table();
  }
  render(): void {
    this.appendInto('.winners-view-wrap');
    this.winnersTotalCars.appendInto('.winners-view');
    this.winnersPage.appendInto('.winners-view');
    this.winnersTable.appendInto('.winners-view');
  }
}

export const winnersView = new WinnersView();
