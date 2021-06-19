import { request } from '../api/api-requests';
import { BaseComponent } from '../components/base-component';
import { Button } from '../components/button';
import { garageView } from '../pages/garage/garage-view';
import { winnersView } from '../pages/winners/winners-view';
import { state } from '../state/state';

export class Pagination extends BaseComponent {
  prevBtn: Button;
  nextBtn: Button;

  constructor() {
    super('div', ['pagination']);

    this.prevBtn = new Button('Prev', ['button', 'prev-button', 'primary'], 'prev');
    this.prevBtn.elem.setAttribute('disabled', 'dasabled');
    this.nextBtn = new Button('Next', ['button', 'next-button', 'primary'], 'next');
    this.nextBtn.elem.setAttribute('disabled', 'dasabled');

    this.nextBtn.elem.addEventListener('click', this.renderNextPage);
    this.prevBtn.elem.addEventListener('click', this.renderPrevPage);
  }

  render(): void {
    this.appendInto('.pagination-wrap');
    this.prevBtn.appendInto('.pagination');
    this.nextBtn.appendInto('.pagination');
  }

  updateButtonsView(pageLimit: number): void {
    let currentPage: number;
    let totalCars: number;

    if (state.view === 'garage') {
      currentPage = state.garagePage;
      totalCars = state.garageTotalCars;
    } else {
      currentPage = state.winnersPage;
      totalCars = state.winnersTotalCars;
    }
    if (currentPage * pageLimit < totalCars) {
      this.nextBtn.elem.disabled = false;
    } else {
      this.nextBtn.elem.disabled = true;
    }
    if (currentPage > 1) {
      this.prevBtn.elem.disabled = false;
    } else {
      this.prevBtn.elem.disabled = true;
    }
  }

  renderNextPage = async (): Promise<void> => {
    if (state.view === 'garage') {
      state.garagePage++;
      await request.updateGarageCars();
      garageView.garage.render();
    }
    if (state.view === 'wins') {
      state.winnersPage++;
      await request.updateWinnersCars();
      winnersView.render();
    }
  };

  renderPrevPage = async (): Promise<void> => {
    if (state.view === 'garage') {
      state.garagePage--;
      await request.updateGarageCars();
      garageView.garage.render();
    }
    if (state.view === 'wins') {
      state.winnersPage--;
      await request.updateWinnersCars();
      winnersView.render();
    }
  };
}
