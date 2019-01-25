import React from 'react';

// Components
import Modal from 'components/Modal';

// Containers
import Form from './containers/Form';

// Ducks
import { EDIT_MODAL_ID } from './ducks';

// Styles
import styles from './Edit.scss';

const Edit = () => (
  <Modal
    classNames={{
      container: styles.Container,
    }}
    id={EDIT_MODAL_ID}
  >
    {(props: Object): func => (
      <Form {...props} />
    )}
  </Modal>
);

export default Edit;
