import moment from 'moment';
import { MessageBox } from 'element-ui';

const setCookies = cookieMap => {
  const tomorrow = moment().add(1, 'days').toDate();
  Object.keys(cookieMap).forEach(item => {
    document.cookie = `${item}=${cookieMap[item]}; expires=${tomorrow}`;
  });
};

const getCookies = () => {
  let cookieArr = [];
  try {
    cookieArr = document.cookie.split('; ').map(item => item.split('='));
  } catch (e) { }
  
  let cookieMap = {};
  cookieArr.forEach(item => {
    cookieMap[item[0]] = item[1];
  });

  return cookieMap;
};

const getUserInfo = ($router) => {
  const { userName, token } = getCookies();
  if (!token) {
    MessageBox.alert('登录用户已过期，请重新登陆', '提示', {
      confirmButtonText: '确定',
      callback: () => { $router.push({ name: 'login' }) }
    });
  }
  return { userName, token };
};

export {
  getCookies,
  setCookies,
  getUserInfo
}