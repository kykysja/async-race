import { BaseComponent } from '../../components/base-component';
import { Table } from '../../components/table';
import { Store } from '../../shared/store';

export class WinnersView extends BaseComponent {
  winnersTotalCars: BaseComponent;
  winnersPage: BaseComponent;
  winnersTable: Table;

  constructor() {
    super('div', ['winners-view']);

    this.winnersTotalCars = new BaseComponent('h1', ['winners-total-cars']);
    this.winnersTotalCars.elem.innerText = `Winners (${Store.state.winnersTotalCars})`;
    this.winnersPage = new BaseComponent('h2', ['winners-page']);
    this.winnersPage.elem.innerText = `Page #${Store.state.winnersPage}`;
    this.winnersTable = new Table();
  }
  renderWinnersView(): void {
    this.winnersTotalCars.appendInto('.winners-view');
    this.winnersPage.appendInto('.winners-view');
    this.winnersTable.appendInto('.winners-view');
  }
}
