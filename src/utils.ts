import isPlainObject from 'lodash/isPlainObject'
import get from 'lodash/get'
import { IPlainObject } from './types'

function isObject(value: any): boolean {
    return typeof value === 'object'
}

function isString(value: any): boolean {
    return typeof value === 'string'
}

function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value)
}

function isArray(value: any): boolean {
    return Array.isArray(value)
}

function isEnumObj(value: any): boolean {
    if (!isPlainObject(value)) return false
    const keys = Object.keys(value)
    let result = true
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const enumItem = value[key]
        if (isNumber(enumItem)) {
            continue
        }
        if (isPlainObject(enumItem) && isNumber(enumItem.code)) {
            continue
        }
        result = false
        break
    }
    return result
}

function isEnumArr(value: any): boolean {
    if (!isArray(value)) return false
    let result = true
    for (let index = 0; index < value.length; index++) {
        const item = value[index];
        if (isString(item)) {
            continue
        }
        result = false
        break
    }
    return result
}

function isEnumMap(value: any): boolean {
    if (isEnumObj(value)) return true
    if (isEnumArr(value)) return true
    return false
}

function deepFreeze(obj: IPlainObject): IPlainObject {
    Object.freeze(obj)
    Object.keys(obj).forEach((key: string) => {
        if (isObject(obj[key])) {
            deepFreeze(obj[key])
        }
    })
    return obj
}

export default {
    isPlainObject,
    isNumber,
    isString,
    isObject,
    isEnumObj,
    isEnumArr,
    isEnumMap,
    
    get,
    deepFreeze,
}