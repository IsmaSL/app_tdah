import { RouteInfo } from "./vertical-sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: '/app/home',
    title: 'Inicio',
    icon: 'mdi mdi-home',
  },
  {
    path: '/app/patients',
    title: 'Pacientes',
    icon: 'mdi mdi-human-male-female',
  },
  {
    path: '/app/devices',
    title: 'Dispositivos',
    icon: 'mdi mdi-cellphone-link',
  },
  // {
  //   path: '',
  //   title: 'Citas',
  //   icon: 'mdi mdi-calendar-multiple',
  //   extralink: false,
  // },
];
