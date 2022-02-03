import { IElement, IRender } from '@/interfaces';
import { NodePosition } from '@/enums';

export default class Renderer implements IRender, IElement{
  render(parent: Element, node: Element, position: NodePosition = NodePosition.APPEND) {
    parent[position](node);
  }

  getElement(template: string): HTMLElement {
    const node: Element = document.createElement('div');
    node.innerHTML = template;
    return node.firstElementChild as HTMLElement;
  }
}
