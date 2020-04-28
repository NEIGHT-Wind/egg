export const menuList = [
  {
    title: 'Photo',
    id: 'photo',
    icon: 'el-icon-picture-outline',
    children: [
      {
        title: 'Home',
        id: 'photo-home',
        routeConfig: { name: 'photoHome' }
      }
    ]
  }, {
    title: 'Video',
    id: 'video',
    icon: 'el-icon-video-camera',
    children: [
      {
        title: 'Home',
        id: 'video-home',
        routeConfig: { name: 'videoHome' }
      }
    ]
  }
];
