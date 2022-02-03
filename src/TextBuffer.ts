type TextChangeHandler = () => void;

export default class TextBuffer {
  private _text = '';
  private _textChangeHandlers: Array<TextChangeHandler> = [];

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this._textChangeHandlers.forEach((handler: TextChangeHandler) => handler());
  }

  add(value: string) {
    this.text += value;
  }

  remove() {
    const start = 0;
    const end = this.text.length - 1;
    this.text = this.text.substring(start, end);
  }

  getRenderedText() {
    let renderedText = this.text;
    renderedText = renderedText.replace(/ /g, '\xa0');

    return renderedText;
  }

  addTextChangeListener(handler: TextChangeHandler): void {
    this._textChangeHandlers.push(handler);
  }
}
