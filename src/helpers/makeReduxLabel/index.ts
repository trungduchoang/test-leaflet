/**
 * makeReduxLabel
 * @description Add pageName as a prefix of redux labels
 * @description For preventing one page's action can update reducer of another page if they has the same labels
 */
export const makeReduxLabel = (page: string) => (reduxLabel: string) =>
  `${page}-${reduxLabel}`;
