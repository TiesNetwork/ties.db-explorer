import {
  SET_CURRENT_TABLESPACE_ID,
} from './types';

const initialState = {
  currentTablespaceId: 1,
  tables: [
    {
      id: 1,
      address: '0x67628b0a6c9eb165f0a4200ed8f01e5a49565111141bb9c60565187fae17e021',
      name: 'Messages',
    },
    {
      id: 2,
      isDistributed: true,
      address: '0x67628b0a6c9eb165f0a4200ed8f01e5a49565111141bb9c60565187fae17e021',
      name: 'Users',
    },
  ],
  tablespaces: [
    {
      id: 1,
      address: '0x67628b',
      color: 'Blue',
      name: 'Cloud',
    },
    {
      id: 2,
      address: '0x167909',
      color: 'BluePurple',
      name: 'Files',
    },
    {
      id: 3,
      address: '0x12ad4b',
      color: 'Green',
      name: 'Messages',
    },
    {
      id: 4,
      address: '0x7c836e',
      color: 'Purple',
      name: 'Statistics',
    },
    {
      id: 5,
      address: '0x908da1',
      color: 'Red',
      name: 'Settings',
    },
  ],
};

export default (state = initialState, action: Object) => {
  switch (action.type) {
    case SET_CURRENT_TABLESPACE_ID:
      return {
        ...state,
        currentTablespaceId: action.id,
      };
    default:
      return state;
  }
};
