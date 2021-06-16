import { BaseComponent } from '../components/base-component';
import { Button } from '../components/button';
import { state } from '../shared/state';
import { garage } from './garage/garage';
import { winnersView } from './winners/winners-view';

export class Pagination extends BaseComponent {
  prevBtn: Button;
  nextBtn: Button;

  constructor() {
    super('div', ['pagination']);

    this.prevBtn = new Button('Prev', ['button', 'prev-button', 'primary'], 'prev');
    this.prevBtn.elem.setAttribute('disabled', 'dasabled');
    this.nextBtn = new Button('Next', ['button', 'next-button', 'primary'], 'next');
    this.nextBtn.elem.setAttribute('disabled', 'dasabled');

    this.nextBtn.elem.addEventListener('click', this.handleNextBtnClick);
    this.prevBtn.elem.addEventListener('click', this.handlePrevBtnClick);
  }

  render(): void {
    this.appendInto('.pagination-wrap');
    this.prevBtn.appendInto('.pagination');
    this.nextBtn.appendInto('.pagination');
  }

  updatePrevNextButtons(): void {
    if (state.view === 'garage') {
      if (state.garagePage * 7 < state.garageTotalCars) {
        (this.nextBtn.elem as HTMLButtonElement).disabled = false;
      } else {
        (this.nextBtn.elem as HTMLButtonElement).disabled = true;
      }
      if (state.garagePage > 1) {
        (this.prevBtn.elem as HTMLButtonElement).disabled = false;
      } else {
        (this.prevBtn.elem as HTMLButtonElement).disabled = true;
      }
    }
    if (state.view === 'wins') {
      if (state.winnersPage * 10 < state.winnersTotalCars) {
        (this.nextBtn.elem as HTMLButtonElement).disabled = false;
      } else {
        (this.nextBtn.elem as HTMLButtonElement).disabled = true;
      }
      if (state.winnersPage > 1) {
        (this.prevBtn.elem as HTMLButtonElement).disabled = false;
      } else {
        (this.prevBtn.elem as HTMLButtonElement).disabled = true;
      }
    }
  }

  handleNextBtnClick = async (): Promise<void> => {
    if (state.view === 'garage') {
      state.garagePage++;
      await state.updateGarageCars();
      garage.render();
      const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
        document.querySelectorAll('.select-button');

      selectCarButtonsElems.forEach((button) =>
        button.addEventListener('click', garage.garageCars.handleSelectBtnClick)
      );
      this.updatePrevNextButtons();
    }
    if (state.view === 'wins') {
      state.winnersPage++;
      await state.updateWinnersCars();
      winnersView.render();
    }
  };

  handlePrevBtnClick = async (): Promise<void> => {
    if (state.view === 'garage') {
      state.garagePage--;
      await state.updateGarageCars();
      garage.render();
      const selectCarButtonsElems: NodeListOf<HTMLButtonElement> =
        document.querySelectorAll('.select-button');

      selectCarButtonsElems.forEach((button) =>
        button.addEventListener('click', garage.garageCars.handleSelectBtnClick)
      );
      this.updatePrevNextButtons();
    }
    if (state.view === 'wins') {
      state.winnersPage--;
      await state.updateWinnersCars();
      winnersView.render();
    }
  };
}

export const pagination = new Pagination();
