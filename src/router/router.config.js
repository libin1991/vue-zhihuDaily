import Home from '../pages/home/index'
const ThemeList = resolve => require(['../pages/theme/list'], resolve);
const ThemeDetail = resolve => require(['../pages/detail/index'], resolve);
const Comments = resolve => require(['../pages/detail/comments'], resolve);
const Review = resolve => require(['../pages/detail/review'], resolve);
const SectionList = resolve => require(['../pages/section/list'], resolve);
const EditorList = resolve => require(['../pages/editor/list'], resolve);
const EditorDetail = resolve => require(['../pages/editor/detail'], resolve);
const login = resolve => require(['../pages/member/login'], resolve);
const About = resolve => require(['../pages/about/about'], resolve);
const My = resolve => require(['../pages/user/my'], resolve);
const Favorites = resolve => require(['../pages/user/favorites'], resolve);


// Router 配置
export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/theme/:id',
        name: 'ThemeList',
        component: ThemeList
    },
    {
        path: '/detail/:id',
        name: 'ThemeDetail',
        component: ThemeDetail
    },
    {
        path: '/comments/:id',
        name: 'Comments',
        component: Comments
    },
    {
        path: '/review/:id',
        name: 'Review',
        component: Review,
        meta: {
            requiresAuth: true
        }
    },
    {
      path: '/section/:id',
      name: 'SectionList',
      component: SectionList
    },
    {
        path: '/editorlist/:id',
        name: 'EditorList',
        component: EditorList
    },
    {
        path: '/editordetail/:id',
        name: 'EditorDetail',
        component: EditorDetail
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },

    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            requiresAuth: true  // 设置这个路由是需要登录验证
        }
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '*',
        redirect: '/'
    },
];


