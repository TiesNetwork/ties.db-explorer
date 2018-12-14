import { get } from 'lodash';
import React from 'react';
import ReactAce from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/xcode';

// Styles
import styles from './Textarea.scss';

const QueryTextarea = ({ input }) => (
  <div className={styles.Root}>
    <ReactAce
      className={styles.Textarea}
      fontSize={14}
      highlightActiveLine={false}
      mode="mysql"
      name={get(input, 'name')}
      onChange={get(input, 'onChange')}
      theme="xcode"
      showGutter
      showLineNumbers
      showPrintMargin={false}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        tabSize: 2,
      }}
      value={get(input, 'value')}
    />
  </div>
);

export default QueryTextarea;
