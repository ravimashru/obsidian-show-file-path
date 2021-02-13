export function convertPathToHtmlFragment(
  path: string,
  pathContainsFileName: boolean
): DocumentFragment {
  const fragment = new DocumentFragment();
  const pathParts = getPathParts(path, pathContainsFileName);
  pathParts.forEach((part) => {
    fragment.appendChild(getNodeForPathPart(part));
  });
  return fragment;
}

export function getNodeForPathPart(part: PathPart): DocumentFragment {
  const fragment = new DocumentFragment();
  switch (part.type) {
    case PATH_PART_TYPE.FOLDER:
      fragment.appendText(`📁 ${part.name}`);
      break;

    case PATH_PART_TYPE.FILE:
      fragment.appendText(`📄 ${part.name}`);
      break;

    case PATH_PART_TYPE.SEPARATOR:
      fragment.appendText(` » `);
      break;
  }
  return fragment;
}

export function getPathParts(
  path: string,
  lastPartIsFile: boolean
): PathPart[] {
  if (path === '/') {
    return [{ type: PATH_PART_TYPE.FOLDER, name: 'Vault Root' }];
  } else {
    const parts = path.split('/');
    const pathParts: PathPart[] = [];
    parts.forEach((partName) => {
      pathParts.push({ type: PATH_PART_TYPE.FOLDER, name: partName });
      pathParts.push({ type: PATH_PART_TYPE.SEPARATOR });
    });

    // Remove last separator
    pathParts.pop();

    if (lastPartIsFile) {
      pathParts[pathParts.length - 1].type = PATH_PART_TYPE.FILE;
    }

    return pathParts;
  }
}

export interface PathPart {
  type: PATH_PART_TYPE;
  name?: string;
}

export const enum PATH_PART_TYPE {
  FOLDER,
  FILE,
  SEPARATOR,
}
