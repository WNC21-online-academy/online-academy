import NotFoundPage from '../pages/404.vue'
import LoginPage from '../pages/Login.vue'
import HomePage from '../pages/Home.vue'
import CoursesPage from '../pages/Courses.vue'

export default [
  { path: '/', component: HomePage },
  { path: '/signin', component: LoginPage },

  {
    path: '/categories/:id',
    component: CoursesPage,
  },
  // {
  //   path: '/categories/:id',
  //   component: CoursesPage,
  //   meta: { isAuth: true, title: `${DOMAIN_TITLE} | profile` },
  //   children: [
  //     {
  //       path: '',
  //       name: 'profile',
  //       component: profilePostsPage
  //     }
  //   ]
  // },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
  { path: '/404', component: NotFoundPage },
]