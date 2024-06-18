const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline',
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'mdi:email-outline',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline',
  }    
  ,
  {
    path: '/users',
    action: 'read',

    subject: 'users-page',
    title: 'Users',
    icon: 'mdi:account-group',
  }
]

export default navigation
