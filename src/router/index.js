import { createRouter, createWebHistory } from 'vue-router';
import AllMessagesView from '../views/AllMessagesView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: AllMessagesView
		},
		{
			path: '/message/:id',
			name: 'message',
			component: () => import('../views/SingleMessageView.vue')
		}
	]
});

export default router;
