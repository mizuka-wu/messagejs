module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my project',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        '',
        'introduction',
        'installation'
      ]
    }
  }
}
