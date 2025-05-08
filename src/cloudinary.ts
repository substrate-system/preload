import type { Cloudinary } from '@cloudinary/url-gen/index'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { fill } from '@cloudinary/url-gen/actions/resize'

/**
 * Get a default `srcset` attribute.
 *
 * @param cld Cloudinary instance
 * @param filename The filename, as it is in Cloudinary
 * @returns {string} The `srcset` attribute.
 */
export function defaultSrcset (cld:Cloudinary, filename:string):string {
    const URIs:string[] = ([(cld.image(filename)  // the original image
        .format('auto')
        .quality('auto')
        .toURL() + ' 1025w'
    )]).concat(getSrcset(cld, filename, [1024, 768, 480]))

    return URIs.join(', ')
}

export function getSrcset (
    cld:Cloudinary,
    filename:string,
    widths:number[]
):string[] {
    return widths.map(n => (cld.image(filename)
        .format('auto')
        .quality('auto')
        .resize(fill().width(n).gravity(autoGravity()))
        .toURL()) + (` ${n}w`)
    )
}
