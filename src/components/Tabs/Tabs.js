import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';
import { compose, withHandlers } from 'recompose';

// Styles
import styles from './Tabs.scss';

const Tabs = ({
  children,
  className: classNameProp,
  handleClick,
  value,
}) => {
  const className = classNames(classNameProp, styles.Root);
  const itemWidth = 100 / children.length;

  let currentItemIndex = 0;

  Children
    .map(children, child => child)
    .forEach((child, index) => {
      if (get(child, 'props.value') === value) {
        currentItemIndex = index;
      }
    });

  return (
    <div className={className}>
      {Children.map(children, child => child && cloneElement(child, {
        isCurrent: get(child, 'props.value') === value,
        key: get(child, 'props.value'),
        onClick: handleClick,
        style: { flex: `0 0 ${itemWidth}%`}
      }))}

      <div
        className={styles.Selector}
        style={{
          transform: `translateX(${currentItemIndex * 100}%)`,
          width: `${itemWidth}%`,
        }}
      />
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default compose(
  withHandlers({
    handleClick: ({ onChange }) => value =>
      onChange && onChange(value),
  }),
)(Tabs);
