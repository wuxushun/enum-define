export interface IEnumObjItem {
    code: number;
    desc?: string;
}
export type EnumObj = Record<string, IEnumObjItem | number>

export type EnumArr = Array<string>

export type EnumMap = EnumObj | EnumArr

export interface IOptions {
    name: string;
    ignoreCase: boolean;
    separator: string;
}

export interface IPlainObject {
    [key: string]: any;
}