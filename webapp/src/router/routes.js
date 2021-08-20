import NotFoundPage from '../pages/404.vue'
import SignInPage from '../pages/SignIn.vue'
import SignUpPage from '../pages/SignUp.vue'
import HomePage from '../pages/Home.vue'
import CoursesPage from '../pages/Courses.vue'
import CoursePage from '../pages/Course.vue'
import LessonPage from '../pages/Lesson.vue'
import JoinedCoursesPage from '../pages/Joined.vue'
import FavoriteCoursesPage from '../pages/Favorite.vue'
import CategoriesAdminPage from '../pages/Admin/Categories.vue'
import CoursesAdminPage from '../pages/Admin/Courses.vue'
import TeachersAdminPage from '../pages/Admin/Teachers.vue'
import StudentsAdminPage from '../pages/Admin/Students.vue'
import ProfilePage from '../pages/Profile.vue'
import CoursesTeacherPage from '../pages/ForTeacher/Courses.vue'
import CoursesTeacherDetailPage from '../pages/ForTeacher/CourseDetail.vue'
import LessonsTeacherDetailPage from '../pages/ForTeacher/LessonDetail.vue'

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
    path: '/profile',
    component: ProfilePage,
    name: 'profile',
    meta: { auth: true }
  },
  {
    path: '/categories/:id',
    component: CoursesPage,
    name: 'categories'
  },
  {
    path: '/search',
    component: CoursesPage,
    name: 'search'
  },
  {
    path: '/courses/:id',
    component: CoursePage,
    name: 'course-detail'
  },
  {
    path: '/courses/:id/:lessonId',
    component: LessonPage,
    name: 'lesson-detail',
    meta: { auth: true }
  },
  {
    path: '/favorite',
    component: FavoriteCoursesPage,
    name: 'favorite',
    meta: { auth: true }
  },
  {
    path: '/joined',
    component: JoinedCoursesPage,
    name: 'joined',
    meta: { auth: true }
  },
  {
    path: '/admin/categories',
    name: 'manage-categories',
    component: CategoriesAdminPage,
    meta: { auth: true }
  },
  {
    path: '/admin/courses',
    name: 'manage-courses',
    component: CoursesAdminPage,
    meta: { auth: true }
  },
  {
    path: '/admin/teachers',
    name: 'manage-teachers',
    component: TeachersAdminPage,
    meta: { auth: true }
  },
  {
    path: '/admin/students',
    name: 'manage-students',
    component: StudentsAdminPage,
    meta: { auth: true }
  },
  {
    path: '/teacher/owncourses',
    name: 'owncourses',
    component: CoursesTeacherPage,
    meta: { auth: true }
  },
  {
    path: '/teacher/owncourses/:id',
    name: 'owncourses-detail',
    component: CoursesTeacherDetailPage,
    meta: { auth: true }
  },
  {
    path: '/teacher/owncourses/:id/:lessonId',
    name: 'ownlessons-detail',
    component: LessonsTeacherDetailPage,
    meta: { auth: true }
  },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
  { path: '/404', component: NotFoundPage },
]