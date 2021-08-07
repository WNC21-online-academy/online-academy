import NotFoundPage from '../pages/404.vue'
import SignInPage from '../pages/SignIn.vue'
import SignUpPage from '../pages/SignUp.vue'
import HomePage from '../pages/Home.vue'
import CoursesPage from '../pages/Courses.vue'
import CoursePage from '../pages/Course.vue'

export default [
  { path: '/', component: HomePage },
  {
    path: '/sign-up', component: SignUpPage,
    name: 'sign-up',
    meta: { auth: false }
  },
  {
    path: '/sign-in', component: SignInPage,
    name: 'sign-in',
    meta: { auth: false }
  },
  {
    path: '/categories/:id',
    component: CoursesPage,
    name: 'categories'
  },
  {
    path: '/search',
    component: CoursesPage,
    // meta: { auth: true }
  },
  {
    path: '/courses/:id',
    component: CoursePage,
    // meta: { auth: true }
  },
  {
    path: '/favorite',
    component: CoursesPage,
    name: 'favorite'
  },
  {
    path: '/joined',
    component: CoursesPage,
    name: 'joined'
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