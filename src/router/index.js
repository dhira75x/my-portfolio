import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import MySkillsView from '../views/MySkillsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/my-skills',
      name: 'my-skills',
      component: MySkillsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      /* lazy loaded */
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
