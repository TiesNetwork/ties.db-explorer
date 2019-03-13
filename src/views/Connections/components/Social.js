import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Utils
import { capitalize } from 'utils/string';

// Styles
import styles from './Social.scss';

const ConnectionsSocial = ({
  id,
  icon,
  link,
}): Function => {
  const rootClassNames = classNames(styles.Root, styles[`RootVariant${capitalize(id)}`]);
  const iconClassNames = classNames(icon, styles.Icon);

  return (
    <a
      className={rootClassNames}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i className={iconClassNames} />
    </a>
  );
}

ConnectionsSocial.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
};

export default ConnectionsSocial;
