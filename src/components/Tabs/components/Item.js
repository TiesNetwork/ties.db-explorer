import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, withHandlers } from 'recompose';

// Styles
import { Typography } from 'styles';
import styles from './Item.scss';

const TabsItem = ({
  handleClick,
  icon,
  isCurrent,
  registerChild,
  style,
  title,
  value,
}) => {
  const className: Object = classNames(styles.Root, {
    [styles.RootIsCurrent]: !!isCurrent,
    [styles.RootVariantLarge]: icon && title,
  });

  return (
    <button
      className={className}
      onClick={handleClick}
      ref={registerChild}
      style={style}
      type="button"
    >
      {icon && (
        <i className={classNames(styles.Icon, icon)} />
      )}

      {title && (
        <Typography
          className={styles.Title}
          variant={Typography.VARIANT.BUTTON}
        >
          <FormattedMessage
            id={title}
            defaultMessage={title}
          />
        </Typography>
      )}

    </button>
  );
};

TabsItem.propTypes = {
  icon: PropTypes.string,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default compose(
  withHandlers(() => {
    let ref;

    return {
      handleClick: ({ onClick, value }) => event => {
        ref && ref.blur();
        onClick && onClick(value);
      },
      registerChild: () => (node: HTMLElement) => {
        ref = node;
      }
    };
  }),
)(TabsItem);
