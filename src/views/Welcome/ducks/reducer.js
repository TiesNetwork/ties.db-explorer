const initialState = {
  connections: [
    {
      id: 1,
      isOnline: true,
      name: 'AWS',
      url: 'https://aws.amazon.com',
    },
    {
      id: 2,
      isOnline: true,
      name: 'Microsoft Azure',
      url: 'https://www.microsoft.com',
    },
    {
      id: 3,
      isOnline: false,
      name: 'Google Cloud',
      url: 'https://www.google.com',
    },
    {
      id: 4,
      isOnline: false,
      name: 'IMB Cloud',
      url: 'https://www.ibm.com',
    },
  ],
  social: [
    {
      id: 'telegram',
      icon: 'fa-telegram',
      link: 'https://t.me/tiesdb',
    },
    {
      id: 'github',
      icon: 'fa-github-square',
      link: 'http://github.com/tiesnetwork',
    },
    {
      id: 'twitter',
      icon: 'fa-twitter-square',
      link: 'https://twitter.com/tiesnetwork',
    },
  ],
};

export default (state = initialState, action: Object) => {
  switch (action.type) {
    default:
      return state;
  }
};
