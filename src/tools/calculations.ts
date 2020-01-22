export function exclusiveOr(a: boolean, b: boolean): boolean {
  return (a && !b) || (!a && b)
}

// FUN:
export function bothTrueOrBothFalse(a: boolean, b: boolean): boolean {
  return !exclusiveOr(a, b)
}
