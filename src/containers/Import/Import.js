import React from 'react';

// Components
import Modal from 'components/Modal';

// Containers
import Form from './containers/Form';

// Ducks
import { IMPORT_MODAL_ID } from './ducks';

// Styles
import styles from './Import.scss';

const Import = () => (
  <Modal
    classNames={{
      container: styles.Container,
    }}
    id={IMPORT_MODAL_ID}
  >
    <Form />
  </Modal>
);

export default Import;
