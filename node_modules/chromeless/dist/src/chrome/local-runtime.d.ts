import { Client, Command, ChromelessOptions, Cookie, CookieQuery } from '../types';
export default class LocalRuntime {
    private client;
    private chromlessOptions;
    constructor(client: Client, chromlessOptions: ChromelessOptions);
    run(command: Command): Promise<any>;
    private goto(url);
    private waitTimeout(timeout);
    private waitSelector(selector);
    private click(selector);
    private returnCode<T>(fn, ...args);
    private scrollTo<T>(x, y);
    type(text: string, selector?: string): Promise<void>;
    cookiesGet(nameOrQuery?: string | CookieQuery): Promise<Cookie[]>;
    cookiesGetAll(): Promise<Cookie[]>;
    cookiesSet(nameOrCookies: string | Cookie | Cookie[], value?: string): Promise<void>;
    cookiesClearAll(): Promise<void>;
    press(keyCode: number, count?: number, modifiers?: any): Promise<void>;
    returnExists(selector: string): Promise<boolean>;
    returnInputValue(selector: string): Promise<string>;
    returnScreenshot(): Promise<string>;
    private log(msg);
}
