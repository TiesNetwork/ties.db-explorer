import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Utils
import { capitalize } from 'utils/string';

// Styles
import styles from './Social.scss';

const WelcomeSocial = ({ items }) => (
  <div className={styles.Root}>
    {items.map(({ id, icon, link }) => {
      const iconClassName = classNames(
        'fab', icon,
        styles.Icon,
        styles[`IconVariant${capitalize(id)}`],
      );

      return (
        <a
          className={styles.Link}
          href={link}
          key={id}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className={iconClassName} />
        </a>
      );
    })}
  </div>
);

const mapStateToProps = ({ views }) => ({
  items: get(views, 'welcome.social', []),
});

export default connect(mapStateToProps)(WelcomeSocial);
