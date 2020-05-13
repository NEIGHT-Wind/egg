import { photoIntroduce, photoModule } from './photo';
import { videoIntroduce, videoModule } from './video';

const login = () => import(/* webpackChunkName: "login" */ './login');
const home = () => import(/* webpackChunkName: "home" */ './home');
const introduce = () => import(/* webpackChunkName: "introduce" */ './introduce');
const editModule = () => import(/* webpackChunkName: "editModule" */ './editModule');

export {
  login,
  home,
  introduce,
  editModule,
  photoIntroduce,
  photoModule,
  videoIntroduce,
  videoModule
}