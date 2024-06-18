/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else if(role=='usersmod') return'/users'
  else return '/home'
}

export default getHomeRoute
