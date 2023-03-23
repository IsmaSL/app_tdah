import { RouteInfo } from "./vertical-sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: '/app/home',
    title: 'Inicio',
    icon: 'mdi mdi-home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/app/patients',
    title: 'Pacientes',
    icon: 'mdi mdi-human-male-female',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/app/devices',
    title: 'Dispositivos',
    icon: 'mdi mdi-cellphone-link',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Citas',
    icon: 'mdi mdi-calendar-multiple',
    class: '',
    extralink: false,
    submenu: []
  },
];
