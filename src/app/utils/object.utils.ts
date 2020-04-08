export function freezeAndSeal(object: any) {
  Object.freeze(object);
  Object.seal(object);
}
