import { api } from '../../api/api-requests';
import { BaseComponent } from '../../components/base-component';
import { state } from '../../state/state';
import { Car } from '../garage/car';

export class WinnersTable extends BaseComponent {
  constructor() {
    super('table', ['winners-table']);

    this.elem.setAttribute('cellspacing', '0');
    this.elem.setAttribute('cellpadding', '0');
  }

  render(): void {
    this.elem.innerHTML = `
      <thead>
        <th>№</th>
        <th style="text-align: center; padding: 0 35px;">Car</th>
        <th class="table-name">Name</th>
        <th class="table-button table-wins ${
          state.sortBy === 'wins' ? state.sortOrder : ''
        }" id="sort-by-wins">Wins</th>
        <th class="table-button table-time ${
          state.sortBy === 'time' ? state.sortOrder : ''
        }" id="sort-by-time">Time</th>
      </thead>
      <tbody>
        ${state.winnersCars
          .map(
            (winner, index) => `
          <tr>
            <td>${index + 1}</td>
            <td class="winner-car">${Car.generateCarImage(winner.car.color)}</td>
            <td style="margin-right: 15px;">${winner.car.name}</td>
            <td style="text-align: center;">${winner.wins}</td>
            <td style="text-align: center;">${winner.time}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    document
      .querySelector('#sort-by-wins')
      ?.addEventListener('click', () => api.setSortOrder('wins'));
    document
      .querySelector('#sort-by-time')
      ?.addEventListener('click', () => api.setSortOrder('time'));
  }
}
