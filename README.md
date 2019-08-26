# VTEX Flex Layout

Flex-layout is a layout structuring paradigm built within VTEX IO store framework to allow the construction of complex custom layouts. This paradigm uses the concept of rows and columns to set the desired structure and positioning of components in a given page.

There two basic building blocks of every `flex-layout`, the `flex-layout.row` component and the `flex-layout.col` component. If you are already familiar with the [`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) layout used in CSS, `flex-layout` should be easy to get a grasp since that's being used by `flex-layout.row` and `flex-layout.col` under the hood.

## Blocks API

Since `flex-layout` should be widely used to achieve different layouts, its interface is very permissive:

```
"flex-layout.row": {
  "component": "FlexLayout",
  "composition": "children",
  "allowed": "*"
},
"flex-layout.col": {
  "component": "Col",
  "composition": "children",
  "allowed": "*"
}
```

Notice that you could use _any_ array of blocks as `children`, given that they are allowed by the `block` that is directly above your `row` or `col`. Also, you should **always** use `flex-layout.row` and `flex-layout.col`, not `flex-layout`.

### Configuration

This props should be edited at your theme's `blocks.json`

| Prop name    | Type           | Description                                               | Default value |
| ------------ | -------------- | --------------------------------------------------------- | ------------- |
| `blockClass` | `String`       | Unique class name to be appended to block container class | `""`          |
| `position`   | `PositionEnum` | Indicates where the component should stick                | N/A           |
| `zIndex`     | `Number`       | Controls the `sticky-layout` wrapper z-index              | 999           |

`PositionEnum` description:

| Enum name | Enum value | Description                                  |
| --------- | ---------- | -------------------------------------------- |
| BOTTOM    | 'bottom'   | Component will stick to the bottom of screen |
| TOP       | 'top'      | Component will stick to the top of screen    |

## Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.flex-layout.css` inside the `styles/css` folder. Add your custom styles:

```css
.flexRow {
  margin-top: 10px;
}
```

### CSS namespaces

Below, we describe the namespaces that are defined by `flex-layout`.

| Class name | Description                |
| ---------- | -------------------------- |
| `flexRow`  | The container of a row.    |
| `flexCol`  | The container of a column. |

## Rules and recommendations

- The highest level in a `flex-layout` is **always** made of rows.
- It is only possible to add a `flex-layout.col` inside of a `flex-layout.row` - never as a first-level block.
- When creating levels, it is necessary to alternate between rows and columns. Inside a row, you can only place columns, and inside of columns, you can only place rows.
- Each row and column can have as many levels as you need.
- It is important to note that the flex layout not only improves the layout building but also helps to make everything aligned. Gaps, margins, and paddings can be passed down to `flex-layout.row` and `flex-layout.col` as props.
- Be aware that the structure that you set in your flex layout does not affect only the organization of your code, but also reflects in the way that blocks will be shown and maintained in the StoreFront CMS.
- It is always important to take the organization of both the code and the StoreFront CMS into consideration when planning on how to apply the flex-layout into a page.

## Example usage

This was taken from our default `store-theme`:

```json
  "flex-layout.row#about-us": {
    "children": [
      "image#mobile-phone",
      "flex-layout.col#text-about-us"
    ]
  },

  "flex-layout.col#text-about-us": {
    "children": [
      "rich-text#title-about-us",
      "rich-text#about-us"
    ],
    "props": {
      "blockclass": "textColumn",
      "preventVerticalStretch": true
    }
  },

  "rich-text#title-about-us": {
    "props": {
      "text":
      "# Create meaningful and relevant experiences.",
      "blockClass": "title"
    }
  },

  "image#mobile-phone": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/mobile-phone.png",
      "maxHeight": "",
      "maxWidth": "",
      "blockClass": "storePrint"
    }
  },

  "rich-text#about-us": {
    "props": {
      "text": "**Optimized store framework** \n Free your front-end with our React + Node store framework. Improve usability and SEO, while driving more conversion with modular components, single-page applications, and a ready-for-PWA structure. \n **Multi-currency and language** \n Go international with multiple storefronts to support different languages and easily manage local currencies and payment conditions. \n **Serverless development platform** \n Reduce loading time, improve usability, and make the best out of SEO. Developing scalable components with a comprehensive, easy-to-use toolset, you can build stores faster than ever.",
      "blockClass": "about"
    }
  }
```
