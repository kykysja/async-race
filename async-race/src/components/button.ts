import { BaseComponent } from './base-component';

export class Button extends BaseComponent {
  constructor(btnText: string, classes?: string[], id?: string, type?: string) {
    super('button', classes || undefined);

    if (id) this.elem.id = id;
    if (type) this.elem.setAttribute('type', `${type}`);

    this.elem.innerText = `${btnText}`;
  }
}
