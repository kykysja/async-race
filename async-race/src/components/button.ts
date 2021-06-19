export class Button {
  elem: HTMLButtonElement;

  constructor(btnText: string, classes?: string[], id?: string, type?: string) {
    this.elem = document.createElement('button');

    if (classes) this.elem.classList.add(...classes);
    if (id) this.elem.id = id;
    if (type) this.elem.setAttribute('type', `${type}`);

    this.elem.innerText = `${btnText}`;
  }

  appendInto(selector: string): void {
    const parentElem = document.querySelector(selector);

    if (parentElem) parentElem.appendChild(this.elem);
  }
}
