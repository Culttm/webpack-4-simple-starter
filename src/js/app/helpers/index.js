export const { country, locale, translations } = window.__INIT__;

/**
 * @param componentName
 * @param key
 * @returns {function(): *}
 */
export const asyncLoadByCountry = (componentName, key = false) => {
    let c = key ? country : false;
    if (typeof key === 'string' || key instanceof String)
        c = key;
    return c ? () => import(`@/components/countries/${c}/${componentName}`) : () => import(`@/components/${componentName}`)
};

/**
 * @param lang
 * @param i18n
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const loadLanguageAsync = (lang, i18n) => {
    return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default);
        return i18n.locale = lang;
    })
};