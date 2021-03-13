import {
    UserOutlined,
    ShoppingCartOutlined,
    StarOutlined
} from '@ant-design/icons';

import { ADMIN_NAV_BAR_KEYS } from '../../enums';

export const NavbarItems = [
    {
        name: "Customers",
        key: ADMIN_NAV_BAR_KEYS.CUSTOMER_DETAILS,
        label: "Customers",
        path: `/admin/${ADMIN_NAV_BAR_KEYS.CUSTOMER_DETAILS}`,
        icon: <UserOutlined />
    },
    {
        name: "Orders",
        key: ADMIN_NAV_BAR_KEYS.ORDERS_DETAILS,
        label: "Orders",
        path: `/admin/${ADMIN_NAV_BAR_KEYS.ORDERS_DETAILS}`,
        icon: <ShoppingCartOutlined />
    },
    {
        name: "Ratings",
        key: ADMIN_NAV_BAR_KEYS.RATINGS_DETAILS,
        label: "Ratings",
        path: `/admin/${ADMIN_NAV_BAR_KEYS.RATINGS_DETAILS}`,
        icon: <StarOutlined />
    }
]