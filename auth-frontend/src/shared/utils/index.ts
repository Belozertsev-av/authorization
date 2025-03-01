export const hasProperties = (obj: any): boolean => {
  if (typeof obj !== "object" || obj === null) {
    return false
  }

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (hasProperties(obj[key])) {
          return true
        }
      } else {
        return true
      }
    }
  }

  return false
}

export const getFromStringUnderObject = (path: any, obj: object = {}, separator = ".") => {
  const properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev: any, curr: any) => prev?.[curr], obj)
}

export function debounce<R>(fn: (...args: any) => R, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    return new Promise<R>((resolve) => {
      timeoutId = setTimeout(() => resolve(fn(...args)), ms)
    })
  }
}

export const deepCompare = (obj1: any, obj2: any, excludedProperty?: string): boolean => {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false
  }
  if (obj1 === null && obj2 === null) {
    return true
  }

  const obj1Props = Object.getOwnPropertyNames(obj1)
  const obj2Props = Object.getOwnPropertyNames(obj2)

  if (excludedProperty) {
    if (obj1Props.includes(excludedProperty) && obj2Props.includes(excludedProperty)) {
      obj1Props.splice(obj1Props.indexOf(excludedProperty), 1)
      obj2Props.splice(obj1Props.indexOf(excludedProperty), 1)
    }
  }

  if (obj1Props.length !== obj2Props.length) {
    return false
  }

  for (const propName of obj1Props) {
    if (typeof obj1[propName] !== "function") {
      if (typeof obj1[propName] === "object") {
        if (!deepCompare(obj1[propName], obj2[propName], excludedProperty)) {
          return false
        }
      } else if (obj1[propName] !== obj2[propName]) {
        return false
      }
    }
  }
  return true
}
