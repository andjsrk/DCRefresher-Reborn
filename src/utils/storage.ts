import browser from "webextension-polyfill";

export const storage = browser.storage.local;

export const get = <T>(key?: string | null): Promise<T> =>
    storage.get(key)
        .then((value) => !key ? value : value[key]);

export const set = <T>(key: string, value: T): Promise<void> =>
    storage.set({ [key]: value });

export const remove = (keys: string | string[]): Promise<void> =>
    storage.remove(keys);

export const module = {
    get<T>(module: string, key?: string): Promise<T> {
        return get(key ? `refresher.module:${module}-${key}` : `refresher.module:${module}`)
            .then((value) =>
                typeof value === "string" && value[0] === "{"
                    ? JSON.parse(value)
                    : value
            );
    },
    set(module: string, key: string, value: unknown): void {
        set(`refresher.module:${module}-${key}`, value);
    },
    setGlobal(module: string, dump: unknown): void {
        set(`refresher.module:${module}`, dump);
    }
};

export default {
    storage,
    get,
    set,
    remove,
    module
};