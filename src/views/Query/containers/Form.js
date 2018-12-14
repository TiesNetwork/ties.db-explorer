import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';

// Components
import Button from 'components/Button';
import Textarea from '../components/Textarea';

// Styles
import styles from './Form.scss';

const QueryForm = ({
  handleSubmit,
}) => (
  <form
    className={styles.Root}
    onSubmit={handleSubmit}
  >
    <Field component={Textarea} name="query" />

    <div className={styles.Actions}>
      <div className={styles.Left}>
        <Button
          classNames={{
            root: styles.Save,
            icon: styles.SaveIcon,
          }}
          icon="far fa-bookmark"
        />

        <Button
          classNames={{
            root: styles.Favorite,
            icon: styles.FavoriteIcon,
          }}
          icon="far fa-star"
        />
      </div>

      <div className={styles.Right}>
        <Button className={styles.Reset}>
          Reset
        </Button>

        <Button className={styles.Run}>
          Run Current
        </Button>
      </div>

    </div>
  </form>
);

export default compose(
  reduxForm({
    form: 'queryForm',
  }),
)(QueryForm);
