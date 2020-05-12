const editModuleSubmit = (params) => {
  return new Promise(res => {
    console.log('editModuleSubmit', params);
    setTimeout(() => {
      res({});
    }, 2000);
  })
};

export default {
  editModuleSubmit
};
