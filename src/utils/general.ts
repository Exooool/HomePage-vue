/**
 * @description 维护全局zIndex
 * @returns { getIndex,nextIndex }
 */
export const globalZIndex = () => {
  let zIndex = 2000;

  const getIndex = () => {
    return zIndex;
  };

  const nextIndex = () => {
    zIndex += 1;
    return zIndex;
  };

  return { getIndex, nextIndex };
};
