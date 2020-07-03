export function deprecated(methodName, alternative) {
  console.warn(`${methodName} is deprecated.
    please use ${alternative} instead`);
}
