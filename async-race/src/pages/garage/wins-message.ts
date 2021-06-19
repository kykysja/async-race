import { BaseComponent } from '../../components/base-component';
import { Winner } from '../../shared/types';

export class WinsMessage extends BaseComponent {
  constructor() {
    super('p', ['message']);
  }

  render(winner: Winner): void {
    this.elem.innerHTML = `${winner.name} went first (${winner.time}s)!`;
  }
}
