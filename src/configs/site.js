// 預設語言
export const LANGUAGE_DEFAULT = 'zh-TW';

export const MENU_LIST = [
  {
    code: 1,
    name: 'homePage',
    text: 'しゅかい',
    route: '/homePage',
    img: '/src/assets/home.svg',
    activeImg: '/src/assets/home_active.svg',
    style: { left: '15px' },
  },
  {
    code: 2,
    name: 'prodcutPage',
    text: 'しょうひん',
    route: '/prodcutPage',
    img: '/src/assets/package.svg',
    activeImg: '/src/assets/package_active.svg',
    style: { left: '105px' },
  },
  {
    code: 3,
    name: 'memberPage',
    text: 'かいいんしりょう',
    route: '/memberPage',
    img: '/src/assets/user.svg',
    activeImg: '/src/assets/user_active.svg',
    style: { left: '195px' },
  },
  {
    code: 4,
    name: 'cartPage',
    text: 'こうものかる',
    route: '/cartPage',
    img: '/src/assets/shoppingCart.svg',
    activeImg: '/src/assets/shoppingCart_active.svg',
    style: { left: '285px' },
  },
];
