const test = (params) => {
  return new Promise(res => {
    console.log('loginSubmit', params);
    setTimeout(() => {
      res({
        token: '123456789'
      });
    }, 2000);
  })
};

export default {
  test
};
