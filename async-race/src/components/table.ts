// import { generateCarImage } from '../shared/elem-generators';
import { state } from '../shared/state';
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
          state.sortBy === 'wins' ? state.sortOrder : ''
        }" id="sort-by-wins">Wins</th>
        <th class="table-button table-time ${
          state.sortBy === 'time' ? state.sortOrder : ''
        }" id="sort-by-time">Time</th>
      </thead>

    `;
  }
}

/*
<tbody>
  ${state.winnersCars
    .map(
      (winner, index) => `
    <tr>
      <td>${index + 1}</td>
      <td class="winner-car">${generateCarImage(winner.color)}</td>
      <td style="margin-right: 15px;">${winner.name}</td>
      <td style="text-align: center;">${winner.wins}</td>
      <td style="text-align: center;">${winner.bestTime}</td>
    </tr>
  `
    )
    .join('')}
</tbody>
*/
