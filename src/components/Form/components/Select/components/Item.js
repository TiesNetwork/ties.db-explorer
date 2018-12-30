import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers } from 'recompose';

// Styles
import { Typography } from 'styles';
import styles from './Item.scss';

const FormSelectItem = ({
  handleClick,
  label,
  value,
}) => (
  <button
    className={styles.Root}
    onClick={handleClick}
    type="button"
  >
    <Typography variant={Typography.VARIANT.BODY2}>
      {label}
    </Typography>
  </button>
);

FormSelectItem.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default compose(
  withHandlers({
    handleClick: ({ label, onClick, value }) => (event: Object) =>
      onClick && onClick({ label, value }, event),
  }),
)(FormSelectItem);
