export const sidebarMenu = [
  { title: 'Home', to: '/' },
  {
    title: 'About Ethel Cain',
    to: '/about',
    children: [
      { title: 'Biography', to: '/about/biography' },
      {
        title: 'Discography',
        to: '/about/discography',
        children: [
          { title: 'Carpet Bed', to: '/about/discography#album-1' },
          { title: 'Golden Age', to: '/about/discography#album-2' },
          { title: 'Inbred', to: '/about/discography#album-3' },
          { title: "Preacher's Daughter", to: '/about/discography#album-4' },
          { title: 'Perverts', to: '/about/discography#album-5' },
          { title: 'Willoughby Tucker', to: '/about/discography#album-6' },
        ],
      },
      { title: 'Gallery', to: '/about/gallery' },
    ],
  },
  { title: 'News', to: '/news' },
  { title: 'Tour', to: '/tour' },
  {
    title: 'Shop',
    to: '/shop',
    children: [
      { title: 'Albums', to: '/shop/albums' },
      { title: 'Merch', to: '/shop/merch' },
    ],
  },
  { title: 'Contacts', to: '/contacts' },
  { title: 'Cart', to: '/cart' },
];
