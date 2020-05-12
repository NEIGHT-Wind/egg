export const menuList = [
  {
    title: 'Photo',
    id: 'photo',
    icon: 'el-icon-picture-outline',
    children: [
      {
        title: 'Introduce',
        id: 'photo-home',
        routeConfig: { name: 'photoIntroduce' }
      }
    ]
  }, {
    title: 'Video',
    id: 'video',
    icon: 'el-icon-video-camera',
    children: [
      {
        title: 'Introduce',
        id: 'video-home',
        routeConfig: { name: 'videoIntroduce' }
      }
    ]
  }
];

export const meunModuleStorageKey = 'MENU_MODULE';
