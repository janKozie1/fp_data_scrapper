

export const morele = {
  selectors: {
    product: 'a.cat-product-image.productLink',
  },
  url: {
    base: "https://www.morele.net/kategoria/{{category}}/,,,,,,,,0,,,,/{{page}}/",
    params: [
      {category: "laptopy-31"},
      {category: "lodowki-do-zabudowy-261"}
    ]
  },
  pages: { from: 1, to: 1},
  data: [
    {
      id: 'image',
      parser: {
        type: 'imageURL',
        args: { }
      },
      selector: '[itemprop=image]',
      multiple: false,
    },
    {
      id: 'price',
      parser: { 
        type: 'price',
        args: { currency: 'zł' }
      },
      selector: '.product-price',
      multiple: false,
    },
    {
      id: 'name',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '.prod-name',
      multiple: false,
    },
    {
      id: 'features',
      parser: {
        type: 'text',
        args: { 
          replacements: [
            ['\n', ''],
          ]
        },
      },
      selector: '.prod-main-features li:not([class])',
      multiple: true,
    },
    {
      id: 'id',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '[itemprop=sku]',
      multiple: false,
    }
  ]
};

export const xkom = {
  selectors: {
    product: 'a[href^="/p/"]',
  },
  url: {
    base: "https://www.x-kom.pl/{{group}}/c/{{category}}.html?page={{page}}",
    params: [
      {category: "1590-smartfony-i-telefony", group: 'g-4'},
      // {category: '1663-tablety', group: 'g-4'},
      // {category: '89-dyski-twarde-hdd-i-ssd', group: 'g-5'},
    ]
  },
  pages: { from: 1, to: 1},
  data: [
    {
      id: 'image',
      parser: {
        type: 'imageURL',
        args: { }
      },
      selector: '#app img[src$=jpg]',
      multiple: false,
    },
    {
      id: 'stars',
      parser: {
        type: 'count',
        args: { selector: 'img[src$="985a91ae09e6b303.svg"]' }
      },  
      selector: 'a[href="#Opinie"]',
      multiple: false,
    },
    {
      id: 'price',
      parser: { 
        type: 'price',
        args: { currency: 'zł' }
      },
      selector: '#app div[order="3"] .iVazGO',
      multiple: false,
    },
    {
      id: 'discount',
      parser: {
        type: 'price',
        args: { currency: 'zł'},
      },
      selector: '#app .cuTTER',
      multiple: false
    },
    {
      id: 'name',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '#app h1',
      multiple: false,
    },
    {
      id: 'manufacturer',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '#app .iIoJeH',
      multiple: false,
    },
    {
      id: 'comments',
      parser: {
        type: 'text',
        args: { 
          replacements: [
            ['.... Rozwiń dalej', '']
          ]
        }
      },
      selector: 'p.gjgIIq',
      multiple: true,
    }
  ]
};