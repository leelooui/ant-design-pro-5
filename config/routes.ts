export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'Amap',
    icon: 'EnvironmentFilled',  
    component: './dashboard/amap',
  },  
  {
    name: 'd3',
    icon: 'dashboard',
    path: '/d3',
    component: './d3',
  }, 
  {
    name: 'Pivot Table',
    icon: 'table',
    path: '/pivotTable',
    component: './TableList',
  },
  {
    name: 'EditTable',
    icon: 'FormOutlined',
    path: '/EditableTable',
    component: './TableList/EditableTable',
  },
  {
    name: '列表展示',
    icon: 'table',
    path: '/TableList/search',
    access: 'canAdmin',
    component: './TableList/search',
    routes: [
      {
        path: '/tableList/search/articles',
        name: '文章',
        hidden:true,
        component: './TableList/search/articles'
      },
      {
        path: '/tableList/search/projects',
        name: '项目',
        hidden:true,
        component: './TableList/search/projects'
      },
      {
        path: '/tableList/search/applications',
        name: '应用',
        hidden:true,
        component: './TableList/search/applications'
      }
    ]
  },
  {
    component: './404',
  },
];
