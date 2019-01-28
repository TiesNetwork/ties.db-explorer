import classNames from 'classnames';
import React from 'react';

// Styles
import styles from './Arrow.scss';

const VARIANT = {
  NEXT: 'next',
  PREV: 'prev',
};

const MainArrow = ({
  currentSlide,
  slideCount,
  variant = VARIANT.NEXT,
  ...props,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootVariantNext]: variant === VARIANT.NEXT,
    [styles.RootVariantPrev]: variant === VARIANT.PREV,
  });

  const iconClassNames = classNames(styles.Icon, 'far', {
    'fa-angle-left': variant === VARIANT.PREV,
    'fa-angle-right': variant === VARIANT.NEXT,
  });

  return (
    <button {...props}
      className={rootClassNames}
      type="button"
    >
      <i className={iconClassNames} />
    </button>
  );
};

MainArrow.VARIANT = VARIANT;

export default MainArrow;
