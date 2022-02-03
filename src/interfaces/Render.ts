import { NodePosition } from '@/enums';

export interface IRender {
  render(parent: Element, node: Element, position: NodePosition): void;
}
