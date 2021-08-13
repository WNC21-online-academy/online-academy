import NotFoundPage from '../pages/404.vue'
import SignInPage from '../pages/SignIn.vue'
import SignUpPage from '../pages/SignUp.vue'
import HomePage from '../pages/Home.vue'
import CoursesPage from '../pages/Courses.vue'
import CoursePage from '../pages/Course.vue'
import CategoriesAdminPage from '../pages/Admin/Categories.vue'
import CoursesAdminPage from '../pages/Admin/Courses.vue'
import TeachersAdminPage from '../pages/Admin/Teachers.vue'
import StudentsAdminPage from '../pages/Admin/Students.vue'

export default [
  { path: '/', component: HomePage },
  {
    path: '/sign-up',
    component: SignUpPage,
    name: 'sign-up',
    meta: { auth: false }
  },
  {
    path: '/sign-in',
    component: SignInPage,
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
  // meta: { auth: true, role: 'admin' },
  {
    path: '/admin/categories',
    name: 'manage-categories',
    component: CategoriesAdminPage
  },
  {
    path: '/admin/courses',
    name: 'manage-courses',
    component: CoursesAdminPage
  },
  {
    path: '/admin/teachers',
    name: 'manage-teachers',
    component: TeachersAdminPage
  },
  {
    path: '/admin/students',
    name: 'manage-students',
    component: StudentsAdminPage
  },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
  { path: '/404', component: NotFoundPage },
]