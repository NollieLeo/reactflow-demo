import {isUndefined} from 'lodash-es'
function isDefined<T>(obj: T | undefined): obj is T {
    return !isUndefined(obj);
}


export default isDefined