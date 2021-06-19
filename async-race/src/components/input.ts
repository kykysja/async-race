export class Input {
  elem: HTMLInputElement;

  constructor(classes?: string[], id?: string, type?: string, name?: string) {
    this.elem = document.createElement('input');

    if (classes) this.elem.classList.add(...classes);
    if (id) this.elem.id = id;

    this.elem.setAttribute('type', `${type}`);
    this.elem.setAttribute('name', `${name}`);
  }

  appendInto(selector: string): void {
    const parentElem = document.querySelector(selector);

    if (parentElem) parentElem.appendChild(this.elem);
  }
}
