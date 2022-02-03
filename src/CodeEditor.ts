import { ITemplate } from '@/interfaces';

import Renderer from '@/Renderer';
import TextBuffer from '@/TextBuffer';
import Cursor from '@/Cursor';

export default class CodeEditor extends Renderer implements ITemplate {
  private readonly _parent: Element | HTMLElement;
  private readonly _node: HTMLElement;
  private readonly _text: HTMLElement;

  private _cursor: Cursor;
  private _buffer: TextBuffer = new TextBuffer();
  private _isFocused = false;

  constructor(parent: Element | HTMLElement) {
    super();

    this._parent = parent;
    this._node = this.getElement(this.getTemplate());
    this._text = this._node.querySelector('.editor__code')!;

    this._text.style.fontSize = '14px';
    this._text.style.lineHeight = '16px';

    this.render(this._parent, this._node);

    this._cursor = new Cursor(this._text, { className: 'editor__cursor' });
    this._cursor.setPosition({ top: 0, left:0 });

    this._initHandlers();
  }

  getTemplate(): string {
    return (`
      <pre class="editor" tabindex="0">
          <code class="editor__code">${this._buffer.getRenderedText()}</code>
      </pre>
    `);
  }

  private _initHandlers() {
    this._node.addEventListener('focus', this._focusHandler);
    this._node.addEventListener('blur', this._blurHandler);
    this._node.addEventListener('keydown', this._keyDownHandler);
    this._node.addEventListener('keypress', this._keyPressHandler);

    this._buffer.addTextChangeListener(this._textChangeHandler);
  }

  private _focusHandler = (): void => {
    this._isFocused = true;
    this._cursor.show();
  };

  private _blurHandler = (): void => {
    this._isFocused = false;
    this._cursor.hide();
  };

  private _textChangeHandler = (): void => {
    this._text.textContent = this._buffer.getRenderedText();
    this._cursor.update();
  };

  private _keyDownHandler = (event: KeyboardEvent): void => {
    const key = event.key;

    if (key === 'Tab') {
      this._buffer.add('  ');
      event.preventDefault();
    }

    if (key === 'Backspace') {
      this._buffer.remove();
    }
  };

  private _keyPressHandler = (event: KeyboardEvent): void => {
    const key = event.key;

    if (key === 'Enter') {
      this._buffer.add('\n');
    } else {
      this._buffer.add(event.key);
    }
  };
}
