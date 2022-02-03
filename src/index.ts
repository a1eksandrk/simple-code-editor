import CodeEditor from '@/CodeEditor';

const root: Element | null = document.querySelector<HTMLElement>('#app');

if (root) {
  new CodeEditor(root);
}
