# VTEX Flex Layout

Flex-layout is a layout structuring paradigm built within VTEX IO store framework to allow the construction of complex custom layouts. This paradigm uses the concept of rows and columns to set the desired structure and positioning of components in a given page.

There two basic building blocks of every `flex-layout`, the `flex-layout.row` component and the `flex-layout.col` component. If you are already familiar with the [`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) layout used in CSS, `flex-layout` should be easy to get a grasp since that's being used by `flex-layout.row` and `flex-layout.col` under the hood.

## Blocks API

Since `flex-layout` should be widely used to achieve different layouts, its interface is very permissive:

```json
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

This props should be edited at your theme's `blocks.json`:

#### flex-layout.row

| Prop name                  | Type                  | Description                                                                                                   | Default value |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`               | `String`              | Unique class name to be appended to block container class                                                     | `""`          |
| `fullWidth`                | `Boolean`             | Whether or not the component should ocuppy all the available width from its parent                            | `false`       |
| `marginTop`                | `0...10`  | A `number` or `string` magnitude for the `mt` Tachyons token to be applied to this row.                       | `undefined`   |
| `marginBottom`             | `0...10`  | A `number` or `string` magnitude for the `mb` Tachyons token to be applied to this row.                       | `undefined`   |
| `paddingTop`               | `0...10`  | A `number` or `string` magnitude for the `pt` Tachyons token to be applied to this row.                       | `undefined`   |
| `paddingBottom`            | `0...10`  | A `number` or `string` magnitude for the `pb` Tachyons token to be applied to this row.                       | `undefined`   |
| `preserveLayoutOnMobile`   | `Boolean`             | Whether or not the flex-row should break into a column layout on mobile.                                      | `false`       |
| `preventHorizontalStretch` | `Boolean`             | Prevents the row from stretching horizontally to fill its parent width.                                       | `false`       |
| `preventVerticalStretch`   | `Boolean`             | Prevents the row from stretching vertically to fill its parent height with `items-stretch` token.             | `false`       |
| `horizontalAlign`          | `left|right|center` | Controls horizontal alignment for the items inside the flex-row.                                              | `left`        |
| `colSizing`                | `equal|auto`       | Controls the width of the columns inside the flex-row.                                                        | `equal`       |
| `colGap`                   | `0...10`  | A `number` or `string` magnitude for the `pr` Tachyons token to be applied to columns inside of the flex-row. | `undefined`   |
| `rowGap`                   | `0...10`  | A `number` or `string` magnitude for the `pb` Tachyons token to be applied to columns inside of the flex-row. | `undefined`   |

#### flex-layout.col

| Prop name                | Type                 | Description                                                                                                                | Default value |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`             | `String`             | Unique class name to be appended to block container class                                                                  | `""`          |
| `rowGap`                 | `0...10` | A `number` or `string` magnitude for the `pb` Tachyons token to be applied to rows inside of the flex-column.              | `undefined`   |
| `marginLeft`             | `TachyonsScaleInput` | A `number` or `string` magnitude for the `ml` Tachyons token to be applied to this row.                                    | `undefined`   |
| `marginRight`            | `0...10` | A `number` or `string` magnitude for the `mr` Tachyons token to be applied to this column.                                 | `undefined`   |
| `paddingLeft`            | `0...10` | A `number` or `string` magnitude for the `pl` Tachyons token to be applied to this column.                                 | `undefined`   |
| `paddingRight`           | `0...10` | A `number` or `string` magnitude for the `pr` Tachyons token to be applied to this column.                                 | `undefined`   |
| `grow`                   | `Boolean`            | Whether or not the `flex-grow-1` token should be applied to this column.                                                   | `undefined`   |
| `preventVerticalStretch` | `Boolean`            | Prevents the row from stretching vertically to fill its parent height with `height: 100%`, using `height: "auto"` instead. | `false`       |

Note that `TachyonsScaleInput` could be a String or a Number, and represents the magnitude you want to pass down as a prop considering the Tachyons Scale. For example, if you want your `flex-layout.row` to have a top margin of `mt5`, you could do: `"marginTop": 5` or `"marginTop": "5"`.

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
