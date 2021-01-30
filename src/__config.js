
export const defaultConfig = {
  separators: {
    category: '{{category}}',
    page: '{{page}}',
  },
}


export const morele = {
  selectors: {
    product: 'a.cat-product-image.productLink',
  },
  url: "https://www.morele.net/kategoria/{{category}}/,,,,,,,,0,,,,/{{page}}/",
  categories: ["mlynki-do-przypraw-515", "dyski-do-serwerow-147"],
  pages: { from: 1, to: 2 },
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
  url: "https://www.x-kom.pl/g-4/c/{{category}}.html?page={{page}}",
  categories: ["1590-smartfony-i-telefony", '1663-tablety'],
  pages: { from: 1, to: 1 },
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
      id: 'price',
      parser: { 
        type: 'price',
        args: { currency: 'zł' }
      },
      selector: '#app div[order="3"] .iVazGO',
      multiple: false,
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
      selector: '#app a',
      multiple: false,
    },
  ]
};