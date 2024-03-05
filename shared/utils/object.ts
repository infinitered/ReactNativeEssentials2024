export function safeParse<T>(value: string | null | undefined, fallback: T): T {
  try {
    return JSON.parse(value as any)
  } catch {
    return fallback
  }
}

export function getObjectKeys<Obj extends object>(obj: Obj): Array<keyof Obj> {
  return Object.keys(obj) as Array<keyof Obj>
}

export function getObjectValues<Obj extends object>(
  obj: Obj,
): Array<Obj[keyof Obj]> {
  return Object.values(obj) as Array<Obj[keyof Obj]>
}
export function getObjectEntries<Obj extends object>(
  obj: Obj,
): Array<[keyof Obj, Obj[keyof Obj]]> {
  return Object.entries(obj) as Array<[keyof Obj, Obj[keyof Obj]]>
}

export function deleteObjectAttribute<O extends object, A extends keyof O>(
  object: O,
  attr: A,
): Omit<O, A> {
  if (attr in object) {
    const { [attr]: _, ...newObject } = object
    return newObject
  }

  return object
}
