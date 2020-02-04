// TODO this needs documentation
//   - what it's used for
//   - how
//     - input is either array or object
// I think with my custom function I don't use the advantage of being able to minimize the string...

interface CustomKeyMirroredObject {
  [key: string]: string
}

export const mirroredKeys = (
  input: string[] | { [key: string]: null | string }
): CustomKeyMirroredObject => {
  const returnObject: CustomKeyMirroredObject = {}
  if (Array.isArray(input)) {
    input.forEach((element: string) => {
      returnObject[element] = element
    })
  } else if (input instanceof Object) {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        returnObject[key] = key
      }
    }
  } else {
    throw new Error("mirroredKeys: argument 'input' has the wrong format")
  }
  return returnObject
}
