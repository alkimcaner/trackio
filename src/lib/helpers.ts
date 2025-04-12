export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  let context: any;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timerId);
    context = this;

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function gameIdsToQuery(gameIds: string[]) {
  return `fields *,cover.*; where id = (${gameIds.join(
    ","
  )}); sort name asc; limit 500;`;
}
