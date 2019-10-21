/// <reference types="react" />
import { LoadOption, OptionOrReducer } from '../types';
export declare const createRegion: (initialValue?: any) => {
    set: (result: any, option?: LoadOption) => any;
    setBy: (option?: LoadOption) => (result: any) => any;
    load: (asyncFunction: any, option?: OptionOrReducer, exOption?: LoadOption | undefined) => Promise<any>;
    loadBy: (asyncFunction: any, option?: OptionOrReducer, exOption?: LoadOption | undefined) => (params: any) => Promise<any>;
    getProps: () => {
        loading: boolean | undefined;
        fetchTime: number | undefined;
        error: Error | undefined;
    } & import("../types").Props;
    getValue: () => any;
    getLoading: () => any;
    getError: () => any;
    getFetchTime: () => any;
    useProps: () => import("../types").Props;
    useValue: () => any;
    useLoading: () => any;
    useError: () => any;
    useFetchTime: () => any;
    connect: (Component: any, alias?: string) => (ownProps: import("../types").Props) => JSX.Element;
};
export default createRegion;
