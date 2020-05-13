const videoIntroduce = () => import(/* webpackChunkName: "videoIntroduce" */ './introduce');
const videoModule = () => import(/* webpackChunkName: "videoModule" */ './module');

export {
  videoIntroduce,
  videoModule
}