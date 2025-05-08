import 'dotenv/config'
import { test } from '@substrate-system/tapzero'
import { Cloudinary } from '@cloudinary/url-gen'
import { preload } from '../dist/index.js'
import { defaultSrcset } from '../dist/cloudinary.js'

const { CLOUD_NAME } = process.env

const cld = new Cloudinary({
    cloud: { cloudName: CLOUD_NAME },
    url: { secure: true }
})

test('Create the HTML', async t => {
    const tag:string = preload('my-picture.jpg', getSrcset, getHref)
    console.log('**tag**', tag)

    t.ok(tag.includes('link rel="preload"'), 'should create the tag')
    t.ok(tag.includes('res.cloudinary.com'), 'the cloudinary functions work')
})

function getSrcset (localPath:string):string {
    return defaultSrcset(cld, localPath)
}

function getHref (localPath:string):string {
    return cld.image(localPath).toURL()
}
