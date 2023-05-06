import isPlainObject from 'lodash/isPlainObject';
import isObjectLike from 'lodash/isObjectLike';

type ConstructorType = new (value: any, ...args: any) => any;

const isFilledObject = (value: any): boolean => isPlainObject(value) && Object.keys(value).length > 0;

const isEmptyObject = (value: any): boolean => isPlainObject(value) && Object.keys(value).length === 0;

const plainToNew = <R>(
  TypeName: ConstructorType,
  value: object | object[] | undefined,
  ...args: any
): typeof value extends undefined ? undefined : R => {
  if (value instanceof TypeName || isEmptyObject(value) || (Array.isArray(value) && value.length === 0)) {
    return (value as unknown) as R;
  }

  if (Array.isArray(value) && value[0] instanceof TypeName) {
    return (value.map((x) => x) as unknown) as R;
  }

  if (Array.isArray(value) && isPlainObject(value[0])) {
    return (value.map((x) => new TypeName(x, ...args)) as unknown) as R;
  }

  if (isFilledObject(value)) {
    return new TypeName(value, ...args) as R;
  }

  if (Array.isArray(value) && isObjectLike(value[0])) {
    return (value.map((x) => new TypeName(x, ...args)) as unknown) as R;
  }

  return undefined as any;
};

const includedPath = (first?: string, second?: string): boolean => {
  if (first && second && first.length > 1 && second.length > 1) {
    return first.includes(second) || second.includes(first);
  }

  return false;
};

export { isFilledObject, isEmptyObject, plainToNew, includedPath };
