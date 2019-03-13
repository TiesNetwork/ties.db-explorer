import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Item, Select } from 'components/Form';

// Ducks
import {
  fetchTablespaces,
  getTablespaceList,
} from '../ducks';

// Entities
import {
  getTablespacesByConnectionId,
  setTablespaces,
} from 'entities/connections';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Common.scss';

const ConnectionsTablespaces = ({
  tablespaces,
  // Handlers
  handleCancel,
  handleSubmit,
}): Function => (
  <Form
    className={styles.Root}
    onSubmit={handleSubmit}
  >
    <Typography
      className={styles.Title}
      variant={Typography.VARIANT.H6}
    >
      Tablespace List
    </Typography>

    <Typography
      className={styles.Description}
      variant={Typography.VARIANT.CAPTION}
    >
      Select the tablespace you need
    </Typography>

    <div className={styles.Container}>
      {tablespaces && tablespaces.length > 0 && (
        <Select
          format={(values: Array<string>) => values && values.map((hash: string) =>
            tablespaces
              .filter(({ hash: tablespaceHash }) => tablespaceHash === hash)
              .map(({ hash, name }) => ({
                label: name,
                value: hash,
              }))[0])}
          isMultiple
          label="Tablespaces"
          name="tablespaces"
          parse={(tablespaces: Array<Object>): Array<string> =>
            tablespaces.map((tablespace: Object):string => get(tablespace, 'value'))}
          placeholder="Set tablespace"
        >
          {({ inputValue, onClick, value = [] }): Array<Function> =>
            tablespaces
              .filter(({ hash }): bool =>
                value.filter(({ value }): bool =>
                  value === hash).length === 0)
              .filter(({ name }): bool =>
                name.toLowerCase().indexOf(inputValue) > -1)
              .map(({ hash, name }) => (
                <Item
                  key={hash}
                  label={name}
                  onClick={onClick}
                  value={hash}
                />
              ))
          }
        </Select>
      )}
    </div>

    <div className={styles.Actions}>
      <Button
        color={COLOR.SECONDARY}
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <Button
        color={COLOR.PRIMARY}
        type="submit"
      >
        Connect
      </Button>
    </div>
  </Form>
);

const mapStateToProps = (state:Object, { match }): Object => ({
  initialValues: {
    tablespaces: getTablespacesByConnectionId(state, get(match, 'params.connectionId')),
  },
  tablespaces: getTablespaceList(state),
});

export default compose(
  connect(mapStateToProps, { fetchTablespaces }),
  reduxForm({
    enableReinitialize: true,
    form: 'tablespaceForm',
    onSubmit: ({ tablespaces }, dispatch, { match }): void =>
      dispatch(setTablespaces(get(match, 'params.connectionId'), tablespaces)),
  }),
  withHandlers({
    handleCancel: ({ history }): Function =>
      (event: Object): void =>
        history.push('/connections'),
    }),
  lifecycle({
    componentDidMount() {
      this.props.fetchTablespaces();
    }
  })
)(ConnectionsTablespaces);
