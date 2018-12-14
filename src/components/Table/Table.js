import classNames from 'classnames';
import React from 'react';
import ReactTable from 'react-table';

// Styles
import styles from './Table.scss';

const Table = ({
  className,
  ...props
}) => {
  const rootClassNames = classNames(className, styles.Root);

  return (
    <div className={rootClassNames}>
      <ReactTable {...props} />
    </div>
  );
};

export default Table;
