export function safeParse<T>(value: string | null | undefined, fallback: T): T {
  try {
    // @ts-expect-error
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
