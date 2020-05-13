const photoIntroduce = () => import(/* webpackChunkName: "photoIntroduce" */ './introduce');
const photoModule = () => import(/* webpackChunkName: "photoModule" */ './module');

export {
  photoIntroduce,
  photoModule
}