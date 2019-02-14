import React from 'react';

// Components
import Modal from 'components/Modal';

// Containers
import Form from './containers/Form';

// Ducks
import { CONFIRM_MODAL_ID } from './ducks/constants';

// Styles
import styles from './Confirm.scss';

const Edit = () => (
  <Modal
    classNames={{
      container: styles.Container,
    }}
    id={CONFIRM_MODAL_ID}
    title="confirm_modal_title"
  >
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit} />
    )}
  </Modal>
);

export default Edit;
