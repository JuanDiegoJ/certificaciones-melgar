export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  isAdmin?: boolean
};

export type MenuItemWithSubMenuProps = {
  item: SideNavItem
  toggleOpen: () => void
}
