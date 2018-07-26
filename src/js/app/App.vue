<template>
    <div>
        <AsyncComponent v-if="show" />
        <pre> {{ users }} </pre>
    </div>
</template>

<script>
    export default {
        components: {
            AsyncComponent: () => import('@/components/asyncComponent.vue')
        },
        data(){
            return {
                users: [],
                show: false
            }
        },
        mounted(){
            this.fetch()

            setTimeout(() => {
                this.show = true
            }, 4000)
        },
        methods: {
            async fetch(){
                const data = await fetch('http://jsonplaceholder.typicode.com/users');
                this.users = await data.json()
            }
        }
    }
</script>