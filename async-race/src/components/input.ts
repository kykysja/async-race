import { BaseComponent } from './base-component';

export class Input extends BaseComponent {
  constructor(classes?: string[], id?: string, type?: string, name?: string, innerText?: string) {
    super('input', classes || undefined, id || undefined);

    this.elem.setAttribute('type', `${type}`);
    this.elem.setAttribute('name', `${name}`);
    if (innerText) this.elem.innerText = `${innerText}`;
  }
}
