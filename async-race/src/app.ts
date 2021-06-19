import { BaseComponent } from './components/base-component';
import { Navigation } from './shared/navigation';
import { Pagination } from './shared/pagination';

export class App extends BaseComponent {
  navigation: Navigation;
  pagination: Pagination;

  constructor() {
    super('div', ['root-app']);

    this.elem.innerHTML = `
      <div class="navigation-wrap"></div>
      <div class="garage-view-wrap"></div>
      <div class="winners-view-wrap"></div>
      <div class="pagination-wrap"></div>
    `;

    this.pagination = new Pagination();
    this.navigation = new Navigation();
  }

  render(): void {
    this.appendInto('body');
    this.pagination.render();
    this.navigation.render();
  }
}
