<template>
    <div class="panel">
        <domain-header></domain-header>
        <domain-sidebar></domain-sidebar>
    </div>
</template>

<script>

    import DomainHeader from '@/components/common/DomainHeader';
    import DomainSidebar from '@/components/common/DomainSidebar';

    export default {
        data() {
            return {

            }
        },
        components: {
            DomainHeader,
            DomainSidebar
        },
        props: [],
        methods: {

        }
    }

</script>

<style lang="scss">

</style>