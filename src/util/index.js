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

const removeCookies = cookieArr => {
  cookieArr.forEach(item => {
    const lastDay = moment().subtract(1, 'days').toDate();
    document.cookie = `${item}=; expires=${lastDay}`;
  });
};

const getUserInfo = () => {
  const { userName, token } = getCookies();
  if (!token) {
    MessageBox.alert('登录用户已过期，请重新登陆', '提示', {
      confirmButtonText: '确定',
      callback: () => { window.location.hash = '#/login' }
    });
  }
  return { userName, token };
};

export {
  getCookies,
  setCookies,
  removeCookies,
  getUserInfo
}