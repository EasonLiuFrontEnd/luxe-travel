import type { TMenuItem } from '@/api/type'

export type TNavItem = {
  label: string
  href: string
}

export type TDropdownItem = {
  label: string
  href: string
  hasSubmenu?: boolean
  submenuItems?: {
    label: string
    href: string
  }[]
}

export type TTransformedMenus = {
  navItems: TNavItem[]
  dropdownMenus: Record<string, TDropdownItem[]>
}

export const transformMenuData = (
  menuItems: TMenuItem[],
): TTransformedMenus => {
  const activeItems = menuItems.filter((item) => item.isActive)
  activeItems.sort((a, b) => a.order - b.order)

  const navItems = activeItems.map((item) => ({
    label: item.title,
    href: item.linkUrl,
  }))

  const dropdownMenus: Record<string, TDropdownItem[]> = {}

  for (const item of activeItems) {
    if (item.children?.length) {
      const activeChildren = item.children.filter((child) => child.isActive)
      activeChildren.sort((a, b) => a.order - b.order)

      dropdownMenus[item.title] = activeChildren.map((child) => {
        const hasThirdLayer = child.children?.length > 0
        let submenuItems = undefined

        if (hasThirdLayer) {
          const activeGrandChildren = child.children.filter(
            (grandChild) => grandChild.isActive,
          )
          activeGrandChildren.sort((a, b) => a.order - b.order)
          submenuItems = activeGrandChildren.map((grandChild) => ({
            label: grandChild.title,
            href: grandChild.linkUrl,
          }))
        }

        return {
          label: child.title,
          href: child.linkUrl,
          hasSubmenu: hasThirdLayer,
          submenuItems,
        }
      })
    }
  }

  return { navItems, dropdownMenus }
}
