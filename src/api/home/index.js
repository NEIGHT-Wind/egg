const getMenuModuleList = () => {
  return new Promise(res => {
    console.log('getMenuModuleList');
    setTimeout(() => {
      res({
        photo: [
          { title: 'wyx', id: 'wyx' },
          { title: 'lxx', id: 'lxx' }
        ],
        video: []
      });
    }, 2000);
  })
};

export default {
  getMenuModuleList
};
