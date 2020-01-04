import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/overView'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/overView',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/overView/overView.vue'),
                    meta: { title: '总览' }
                },
                {
                    path: '/infoManage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/cabinetManage/infoManage.vue'),
                    meta: { title: '基本信息管理' }
                },
                {
                    path: '/condMonit',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/cabinetManage/condMonit.vue'),
                    meta: { title: '实时状态监测' }
                },
                {
                    path: '/remoteControl',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/cabinetManage/remoteControl.vue'),
                    meta: { title: '远程操控' }
                },
                {
                    path: '/merchatInfo',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/merchatManage/merchatInfo.vue'),
                    meta: { title: '商户信息' }
                },
                {
                    path: '/jurisManage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/merchatManage/jurisManage.vue'),
                    meta: { title: '权限管理' }
                },
                {
                    path: '/statisticsData',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/merchatManage/statisticsData.vue'),
                    meta: { title: '数据统计' }
                },
                {
                    path: '/userManage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/systemManage/userManage.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/messageManage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/systemManage/messageManage.vue'),
                    meta: { title: '消息管理' }
                },
                {
                    path: '/systemMonitor',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/systemManage/systemMonitor.vue'),
                    meta: { title: '系统监控' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
