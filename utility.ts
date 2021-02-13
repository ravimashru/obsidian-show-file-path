export function convertPathToHtmlFragment(path: string): DocumentFragment {
  const fragment = new DocumentFragment();
  fragment.appendText(path);
  return fragment;
}
