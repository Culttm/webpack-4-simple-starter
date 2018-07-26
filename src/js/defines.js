const { locale, country } = window.__INIT__;

export default (Vue) => {
    Object.defineProperty(Vue.prototype, '$locale', {
        get() {
            return locale;
        },
    });

    Object.defineProperty(Vue.prototype, '$country', {
        get() {
            return country;
        },
    });
}