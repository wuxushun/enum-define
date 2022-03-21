import { EnumObj, EnumMap, EnumArr, IOptions, IEnumObjItem } from "./types"
import utils from "./utils"

const defaultOptions: IOptions = {
    name: 'Enum',
    ignoreCase: false,
    separator: ' | ',
}

class Define {

    private readonly options: IOptions
    private readonly enums: Record<string, IEnumObjItem>

    constructor(enums: EnumMap, options?: Partial<IOptions> | string) {
        if (utils.isPlainObject(options)) {
            this.options = {
                ...defaultOptions,
                ...options as IOptions,
            }
        } else if (utils.isString(options)) {
            this.options = {
                ...defaultOptions,
                name: options as string,
            }
        } else {
            this.options = defaultOptions
        }

        const nextEnumMap = {}
        if (utils.isEnumArr(enums)) {
            (enums as EnumArr).forEach((item: string, index: number) => {
                Reflect.set(nextEnumMap, item, {
                    code: index,
                    desc: '',
                })
            })
        } else if (utils.isEnumObj(enums)) {
            Object.entries(enums).forEach(([key, value]) => {
                if (utils.isPlainObject(value)) {
                    Reflect.set(nextEnumMap, key, value)
                }
                if (utils.isNumber(value)) {
                    Reflect.set(nextEnumMap, key, {
                        code: value,
                        desc: '',
                    })
                }
            })
        }

        this.enums = utils.deepFreeze(nextEnumMap as EnumObj)
        this.getKeys().forEach((key: string) => {
            Object.defineProperty(this, key, {
                get: function() {

                    return utils.get(this.enums, [key, 'code'], -1)
                },
            })
        })


        utils.deepFreeze(this)
    }

    public isDefine(key: string): boolean {
        return this.getKeys().includes(key)
    }

    public has(key: string | number): boolean {
        if (utils.isString(key) && this.isDefine(key as string)) return true
        if (utils.isNumber(key)) {
            const findItem = Object.values(this.enums).find((item: IEnumObjItem) => item.code === key)
            if (findItem) return true
        }
        return false
    }

    public getKeys(): Array<string> {
        return Object.keys(this.enums)
    }

    public getItem(key: string): IEnumObjItem {
        if (!utils.isString(key)) return undefined
        const _getKey = (_key: string) => this.options.ignoreCase ? _key.toLowerCase() : _key 
        const findKey = this.getKeys().find((key: string) => _getKey(key) === _getKey(key))
        return utils.get(this.enums, findKey)
    }

    public getItemDesc(key: string): string {
        return utils.get(this.getItem(key), 'desc', '')
    }

    public sizeOf() {
        return this.getKeys().length
    }

    public toString(): string {
        return this.getKeys().join(this.options.separator)
    }

    public getName(): string {
        return this.options.name
    }
}

export default Define