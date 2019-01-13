import { get, keys, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

// Components
import Modal from 'components/Modal';
import Group from './components/Group';
import Item from './components/Item';

// Containers
import Form from './containers/Form';

// Ducks
import { SEARCH_FORM_ID, SEARCH_MODAL_ID } from './ducks/constants';

// Utils
import search from './utils/search';

// Styles
import styles from './Search.scss';

const Search = ({
  query,
  results = {},
}) => (
  <Modal
    classNames={{
      root: styles.Root,
      container: styles.Container,
    }}
    id={SEARCH_MODAL_ID}
  >
    <div className={styles.Form}>
      <Form />
    </div>

    <div className={styles.Result}>
      {!isEmpty(results) && (
        <div className={styles.List}>
          {keys(results).map((key: string) => (
            <Group key={key} title={key}>
              {get(results, `${key}`, []).map((item: Object, index: number) => (
                <Item {...item} key={index} query={query} />
              ))}
            </Group>
          ))}
        </div>
      )}
    </div>
  </Modal>
);

Search.propTypes = {
  query: PropTypes.string,
  results: PropTypes.shape({
    fields: PropTypes.array,
    indexes: PropTypes.array,
    table: PropTypes.array,
    tablespaces: PropTypes.array,
    triggers: PropTypes.array,
  }),
};

const selector = formValueSelector(SEARCH_FORM_ID);
const mapStateToProps = (state: Object, { location }): Object =>
  search(
    state,
    selector(state, 'search'),
    matchPath(get(location, 'pathname'), {
      path: '/:tablespaceHash?/:viewId?/:tableHash?'
    })
  );

export default withRouter(connect(mapStateToProps)(Search));
