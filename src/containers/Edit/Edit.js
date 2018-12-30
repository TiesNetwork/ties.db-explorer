import React from 'react';

// Components
import Modal from 'components/Modal';
import Form from './components/Form';

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
    {({ hash, type }) => (
      <Form
        hash={hash}
        type={type}
      />
    )}
  </Modal>
);

export default Edit;
