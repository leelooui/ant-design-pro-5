import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  collapsed?:boolean;
  collapsedButtonRender?:boolean;
} = {
  navTheme: "realDark",
  primaryColor: "#1890ff",
  layout: "side",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  title: "LeeLoo",
  pwa: false,
  iconfontUrl: "", 
  collapsed:true,
  collapsedButtonRender: false,
  menu: {
    locale: true,
    defaultOpenAll:true,
    type: 'sub', 
  }, 
  headerHeight: 48,
  headerRender: false,
  logo: './icons/log.png', 
};

export default Settings;
