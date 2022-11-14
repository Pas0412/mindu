import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from "../views/home.vue";

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/table.vue")
            }, {
                path: "/sdgt",
                name: "sdgtForm",
                meta: {
                    title: '表格',
                    permiss: '15'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/forms/sdgt.vue")
            }, {
                path: "/queryConclusion",
                name: "queryConclusion",
                meta: {
                    title: '汇总',
                    permiss: '16'
                },
                component: () => import ( /* webpackChunkName: "queryConclusion" */ "../views/forms/queryConclusion.vue")
            }, {
                path: "/zmjf",
                name: "zmjf",
                meta: {
                    title: '中闽',
                    permiss: '17'
                },
                component: () => import ( /* webpackChunkName: "zmjf" */ "../views/forms/zmjf.vue")
            }, {
                path: "/hxct",
                name: "hxct",
                meta: {
                    title: '华创',
                    permiss: '18'
                },
                component: () => import ( /* webpackChunkName: "hxct" */ "../views/forms/hxct.vue")
            }, {
                path: "/hxjt",
                name: "hxjt",
                meta: {
                    title: '华兴',
                    permiss: '19'
                },
                component: () => import ( /* webpackChunkName: "hxjt" */ "../views/forms/hxjt.vue")
            },{
                path: "/httz",
                name: "httz",
                meta: {
                    title: '华投',
                    permiss: '20'
                },
                component: () => import ( /* webpackChunkName: "httz" */ "../views/forms/httz.vue")
            },{
                path: "/fttz",
                name: "fttz",
                meta: {
                    title: '福投',
                    permiss: '21'
                },
                component: () => import ( /* webpackChunkName: "fttz" */ "../views/forms/fttz.vue")
            },{
                path: "/mdzy",
                name: "mdzy",
                meta: {
                    title: '闽都',
                    permiss: '22'
                },
                component: () => import ( /* webpackChunkName: "mdzy" */ "../views/forms/mdzy.vue")
            },{
                path: "/groupAuth",
                name: "groupAuth",
                meta: {
                    title: '集团公司委托',
                    permiss: '23'
                },
                component: () => import ( /* webpackChunkName: "groupAuth" */ "../views/forms/groupAuth.vue")
            },{
                path: "/leaseMonthly",
                name: "leaseMonthly",
                meta: {
                    title: '月度汇总',
                    permiss: '24'
                },
                component: () => import ( /* webpackChunkName: "leaseMonthly" */ "../views/forms/leaseMonthly.vue")
            },{
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    permiss: '11'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/charts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    permiss: '5'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/form.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    permiss: '3'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者',
                    permiss: '14'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/permission.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    permiss: '6'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标',
                    permiss: '10'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/icon.vue")
            },  {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/user.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '8'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/editor.vue')
            }, {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9'
                },
                component: () => import (/* webpackChunkName: "markdown" */ '../views/markdown.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/login.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 闽都置业后台管理系统`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
