import { BaseComponent } from './components/base-component';

export class App extends BaseComponent {
  constructor() {
    super('div', ['root-app']);

    this.elem.innerHTML = `
      <div class="page-nav-buttons-wrap"></div>
      <div class="garage-view-wrap"></div>
      <div class="winners-view-wrap"></div>
      <div class="pagination-wrap"></div>
    `;
  }

  render(): void {
    this.appendInto('body');
  }
}
