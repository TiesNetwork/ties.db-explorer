import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { formValueSelector } from 'redux-form';

// Components
import Modal from 'components/Modal';
import Group from './components/Group';
import Link from './components/Link';

// Containers
import Form from './containers/Form';

// Utils
import search from './utils/search';

// Styles
import styles from './Search.scss';

const Search = ({
  results = [],
}) => (
  <Modal
    classNames={{
      root: styles.Root,
      container: styles.Container,
    }}
    id="search"
  >
    <div className={styles.Form}>
      <Form />
    </div>

    {results && results.length > 0 && (
      <div className={styles.List}>
        {results.map(({ items, title }, index: number) => items && items.length > 0 && (
          <Group key={index} title={title}>
            {items.map((item: Object, index: number) => (
              <Link {...item} key={index} />
            ))}
          </Group>
        ))}
      </div>
    )}
  </Modal>
);

const selector = formValueSelector('searchForm');
const mapStateToProps = (state: Object) => ({
  results: search(
    get(state, 'entities'),
    selector(state, 'search'),
    {
      limit: 3,
      whitelist: ['fields', 'indexes', 'triggers', 'tables', 'tablespaces'],
    }
  ),
});

export default compose(
  connect(mapStateToProps),
)(Search);
