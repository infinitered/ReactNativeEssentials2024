export function safeParse<T>(value: string | null | undefined, fallback: T): T {
  try {
    return JSON.parse(value as any)
  } catch {
    return fallback
  }
}
