<template>
    <div class="panel">
        <domain-header></domain-header>
        <domain-sidebar></domain-sidebar>
        <domain-bar></domain-bar>
        <router-view></router-view>
    </div>
</template>

<script>

    import DomainHeader from '@/components/common/DomainHeader';
    import DomainSidebar from '@/components/common/DomainSidebar';
    import DomainBar from '@/components/common/DomainBar';

    export default {
        data() {
            return {

            }
        },
        components: {
            DomainHeader,
            DomainSidebar,
            DomainBar
        },
        props: [],
        methods: {

        }
    }

</script>

<style lang="scss">

</style>