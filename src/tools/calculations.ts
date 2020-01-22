export function exclusiveOr(a: boolean, b: boolean): boolean {
  return (a && !b) || (!a && b)
}
