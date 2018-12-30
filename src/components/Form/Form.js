import PropTypes from 'prop-types';
import React from 'react';

const Form = ({
  children,
  className,
  onSubmit,
}) => (
  <form
    className={className}
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
