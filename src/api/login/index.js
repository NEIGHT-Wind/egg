const loginSubmit = (params) => {
  return new Promise(res => {
    console.log('loginSubmit', params);
    setTimeout(() => {
      res({
        token: `${params.userName}-token`
      });
    }, 2000);
  })
};

export default {
  loginSubmit
};
