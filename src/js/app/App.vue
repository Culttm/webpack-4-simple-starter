<template>
    <div>
        <SuperComponent />
        <button @click="changeLocale('ru')">RU</button>
        <button @click="changeLocale('uk')">UK</button>
        <button @click="changeLocale('en')">EN</button>
    </div>
</template>

<script>
    import { asyncLoadByCountry, loadLanguageAsync } from '@/helpers'

    export default {
        components: {
            SuperComponent: asyncLoadByCountry('SuperComponent', true)
        },
        methods: {
            async changeLocale(locale) {
                await loadLanguageAsync(locale, this.$i18n);
            }
        }
    }
</script>