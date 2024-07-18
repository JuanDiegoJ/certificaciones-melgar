import { Icon } from '@iconify/react';

import { SideNavItem } from './types';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Inicio',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
    isAdmin: false
  },
  {
    title: 'Certificaciones',
    path: '/cer',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    isAdmin: false,
    subMenuItems: [
      { title: 'Estratificación', path: '/estratificacion', isAdmin: false },
      { title: 'Mis certificaciones', path: '/mis-certificaciones', isAdmin: false },
    ],
  },
  {
    title: 'Perfil',
    path: '/perfil',
    icon: <AiOutlineUser size={24} />,
    isAdmin: false
  },
  {
    title: 'Mantenimiento',
    path: '/man',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    isAdmin: true,
    subMenuItems: [
      { title: 'Desbloqueo', path: '/mantenimiento', isAdmin: true },
      { title: 'Parametros', path: '/parametros', isAdmin: true },
      { title: 'Predios', path: '/nomenclatura', isAdmin: true },
    ],
  },
];
