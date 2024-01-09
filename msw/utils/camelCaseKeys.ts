function camelCaseKey(str: string): string {
  return str.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export function camelCaseKeys<T extends Record<string, any>>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => camelCaseKeys(item)) as unknown as T
  }

  let newObj: Record<string, any> = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[camelCaseKey(key)] = camelCaseKeys(obj[key])
    }
  }
  return newObj as T
}
