export const Final: MethodDecorator = (
  _target: Record<string, any>,
  _key: string | symbol,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => ({
  ...descriptor,
  writable: false,
  configurable: false,
});

export function finalClass<T extends { new (...args: any[]): object }>(target: T): T {
  return class FinalClass extends target {
    constructor(...args: any[]) {
      if (new.target !== FinalClass) {
        throw new Error(`Final class "${target.name}"`);
      }
      super(...args);
    }
  };
}
