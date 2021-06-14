export class BaseComponent {
  elem: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap, classes?: string[], id?: string) {
    this.elem = document.createElement(tag);

    if (classes) this.elem.classList.add(...classes);
    if (id) this.elem.id = id;
  }

  appendInto(selector: string): void {
    const parentElem = document.querySelector(selector);

    if (parentElem) parentElem.appendChild(this.elem);
  }
}
