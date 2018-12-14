export default (styles: Object): Object => {
  const variants = {};

  [...new Array(6)].forEach((item: null, index: number) => {
    const variant = index + 1;

    variants[`H${variant}`] = {
      className: styles[`RootVariantH${variant}`],
      component: `h${variant}`,
      toValue: () => `h${variant}`,
    };
  });

  return variants;
};
