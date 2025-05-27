# preload
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/preload/nodejs.yml?style=flat-square)](https://github.com/substrate-system/preload/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/preload?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/preload)](https://packagephobia.com/result?p=@substrate-system/preload)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Polyform_Small_Business-249fbc?style=flat-square)](LICENSE)


Create a `link` tag with a `preload` attribute, for images.

```html
<link
  rel="preload"
  as="image"
  href="wolf.jpg"
  imagesrcset="wolf_400px.jpg 400w, wolf_800px.jpg 800w, wolf_1600px.jpg 1600w"
  imagesizes="50vw"
>
```

> To preload responsive images, new attributes were recently added to the
> `<link>` element: `imagesrcset` and `imagesizes`

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [API](#api)
  * [`preload(filepath, srcset, href, sizes)`](#preloadfilepath-srcset-href-sizes)
  * [ESM](#esm)
  * [pre-built JS](#pre-built-js)
- [Example](#example)
- [develop](#develop)
- [See also](#see-also)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/preload
```

## API
This exposes ESM via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### `preload(filepath, srcset, href, sizes)`

Takes either a string or a function for `srcset` and `href` attributes.
If they are functions, they will be called with the given `filepath`.

```ts
function preload (
    filepath:string,  // the file path, or filename in Cloudinary
    srcset:((localPath:string)=>string)|string,  // used in `imagesrcset`
    href:string|((localPath:string)=>string),  // full size, original image
    sizes:string = '100vw',
):string
```

### ESM
```js
import { preload } from '@substrate-system/preload'
```

### pre-built JS
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/preload/dist/index.min.js ./public/preload.min.js
```

#### HTML
```html
<script type="module" src="./preload.min.js"></script>
```

## Example

This package includes some utilities for working
with [Cloudinary](https://cloudinary.com/).

```js
import { Cloudinary } from '@cloudinary/url-gen'
import { preload } from '@substrate-system/preload'
import { defaultSrcset } from '@substrate-system/preload/cloudinary'

// can pass in functions for `srcset` and `href` arguments
const tag:string = preload(
  'my-picture.jpg',
  getSrcset,
  getHref,
  '(max-width: 700px) 100vw, 50vw'  // sizes
)

// use Cloudinary
const cld = new Cloudinary({
    cloud: { cloudName: CLOUD_NAME },
    url: { secure: true }
})

function getSrcset (localPath:string):string {
    return defaultSrcset(cld, localPath)
}

function getHref (localPath:string):string {
    return cld.image(localPath).toURL()
}
```

## develop

This needs a `.env` file in the `test` directory.

```sh
cp ./test/.env.example ./test/.env
```

## See also

* [MDN docs `rel=preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload)
* [Using responsive images in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)
* [Preloading responsive images](https://medium.com/@akashjha9041/preloading-responsive-images-3aecf114968e)
