import { ITemplate } from '@/interfaces';

import Renderer from '@/Renderer';

type CursorPosition = {
  top: number,
  left: number
}

type CursorSettings = {
  className?: string,
  width?: number,
  height?: number,
}

export default class Cursor extends Renderer implements ITemplate {
  private readonly _parent: Element | HTMLElement;
  private readonly _node: HTMLElement;

  private _isShown = false;

  private _className: string | undefined;

  get isShown() {
    return this._isShown;
  }

  set isShown(value) {
    if (value) {
      this._node.classList.remove('editor__cursor_hide');
    } else {
      this._node.classList.add('editor__cursor_hide');
    }

    this._isShown = value;
  }

  constructor(
    parent: Element | HTMLElement,
    settings?: CursorSettings
  ) {
    super();

    if (settings) {
      this._initSettings(settings);
    }

    this._parent = parent;
    this._node = this.getElement(this.getTemplate());

    this.render(this._parent, this._node);
  }

  setPosition(position: CursorPosition) {
    this._node.style.top = `${position.top}px`;
    this._node.style.left = `${position.left}px`;
  }

  show(): void {
    if (!this.isShown) {
      this.isShown = true;
    }
  }

  hide(): void {
    if (this.isShown) {
      this.isShown = false;
    }
  }

  update(): void {
    this.render(this._parent, this._node);
  }

  getTemplate(): string {
    return `<span class="${this._className} editor__cursor_hide"></span>`;
  }

  _initSettings(settings: CursorSettings) {
    this._className = settings.className;
  }
}
