/**
 * Create a `<link rel="preload">` tag.
 *
 * @param {string} filepath Local file path
 * @param {string} sizes Sizes attribute
 * @param srcset A `srcset` string or a function that returns it.
 * @param href An `href` string or a function that returns it.
 * @returns {string} The link tag with preload attribute.
 */
export function preload (
    filepath:string,
    srcset:((localPath:string)=>string)|string,
    href:string|((localPath:string)=>string),
    sizes:string = '100vw',
):string {
    if (typeof srcset !== 'string') {
        srcset = srcset(filepath)
    }

    if (typeof href !== 'string') {
        href = href(filepath)
    }

    return `<link rel="preload" as="image" href=${href} imagesrcset="${srcset}" imagesizes=${sizes} />`
}
