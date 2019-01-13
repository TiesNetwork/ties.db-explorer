export default (func, limit) => {
  let inThrottle;

  // eslint-disable-next-line
  return function() {
    // eslint-disable-next-line
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false }, limit);
    }
  };
};
