import { isArray, isObject } from 'lodash';

interface ObjProps {
  [index: string]: any;
}

export function transformToPlainObject<T = any>(obj: ObjProps): T | T[] {
  if (isArray(obj)) {
    const newArray = obj.map(i => transformToPlainObject(i));

    return newArray as T[];
  }

  const newObj = Object.assign({}, obj);

  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) {
      newObj[key] = transformToPlainObject(obj[key]);
    }
  });

  return newObj as T;
}
