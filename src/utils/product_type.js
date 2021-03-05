import { NAVBAR_TAB_KEYS, PRODUCT_TYPES } from '../enums';

export const getProductType = (type) => {
    switch (type) {
        case NAVBAR_TAB_KEYS.ALL_PRODUCTS:
            return PRODUCT_TYPES.ALL_PRODUCTS;

        case NAVBAR_TAB_KEYS.TOY_PRODUCTS:
            return PRODUCT_TYPES.TOYS;

        case NAVBAR_TAB_KEYS.AUTOMOBILE_PRODUCTS:
            return PRODUCT_TYPES.AUTOMOBILE;

        case NAVBAR_TAB_KEYS.CLOTHES_PRODUCTS:
            return PRODUCT_TYPES.CLOTHES;

        case NAVBAR_TAB_KEYS.ELECTRICAL_PRODUCTS:
            return PRODUCT_TYPES.ELECTRICAL;

        case NAVBAR_TAB_KEYS.GROCERIES_PRODUCTS:
            return PRODUCT_TYPES.GROCERIES;

        case NAVBAR_TAB_KEYS.PETS_PRODUCTS:
            return PRODUCT_TYPES.PETS;

        case NAVBAR_TAB_KEYS.SPORTS_PRODUCTS:
            return PRODUCT_TYPES.SPORTS;

        case NAVBAR_TAB_KEYS.NEW_PRODUCTS:
            return PRODUCT_TYPES.NEW_PRODUCTS;

        case NAVBAR_TAB_KEYS.OLD_PRODUCTS:
            return PRODUCT_TYPES.OLD_PRODUCTS;

        case NAVBAR_TAB_KEYS.ACCESSORIES_PRODUCTS:
            return PRODUCT_TYPES.ACCESSORIES;
        default:
            break;
    }
}