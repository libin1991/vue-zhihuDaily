/**
 * Created by 方雨 on 2017/3/17.
 */

import {imageUrlPrefix} from '../utils/util'

export default {
    methods: {
        fixedImageUrl(url) {
            return imageUrlPrefix(url)
        }
    }
}