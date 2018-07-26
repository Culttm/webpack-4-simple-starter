const { locale, country, translations } = window.__INIT__;
import Vue from 'vue'
require('./defines').default(Vue);


import '../sass/index.scss'
import App from './app/App.vue';

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: locale,
    messages: {
        [locale]: translations
    }
});


export default (instance) => {

    new instance({
        el: '#app',
        i18n,
        render: h => h(App)
    });

};