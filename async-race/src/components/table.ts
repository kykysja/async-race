import { getCarImage, Store } from '../shared/store';
import { BaseComponent } from './base-component';

export class Table extends BaseComponent {
  constructor() {
    super('table', ['table']);

    this.elem.setAttribute('cellspacing', '0');
    this.elem.setAttribute('cellpadding', '0');

    this.elem.innerHTML = `
      <thead>
        <th>№</th>
        <th style="text-align: center;">Car</th>
        <th>Name</th>
        <th class="table-button table-wins ${
          Store.state.sortBy === 'wins' ? Store.state.sortOrder : ''
        }" id="sort-by-wins">Wins</th>
        <th class="table-button table-time ${
          Store.state.sortBy === 'time' ? Store.state.sortOrder : ''
        }" id="sort-by-time">Time</th>
      </thead>
      <tbody>
        ${Store.state.winnersCars
          .map(
            (winner, index) => `
          <tr>
            <td>${index + 1}</td>
            <td class="winner-car">${getCarImage(winner.color)}</td>
            <td style="margin-right: 15px;">${winner.brand} ${winner.model}</td>
            <td style="text-align: center;">${winner.wins}</td>
            <td style="text-align: center;">${winner.bestTime}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;
  }
}
