<template>
    <div class="panel">
        <domain-header></domain-header>
        <domain-sidebar></domain-sidebar>
        <el-row class="contents" :style="{ 'margin-left': slidebarStatic ? '200px' : '60px' }">
            <el-col :span="24" class="customer_contents" v-loading.body="false">
                <domain-bar></domain-bar>
                <router-view></router-view>
            </el-col>
        </el-row>
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

        },
        computed: {
            slidebarStatic() {
                return this.$store.state.navStatus;
            },
            loading() {
                return this.$store.state.loadingStatus;
            }
        },
        mounted() {
            let _that = this;
            if (!window.localStorage.activeId) {
                window.localStorage.setItem('activeId', '1-1');
                _that.$store.commit('menuActive', '1-1');
                _that.$router.push('/panel/show');
            }
        }
    }

</script>

<style lang="scss">
    body, ul, h1 {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    .customer_contents {
        position: relative;
    }
    .el-pagination__jump {
        margin-right: 10px;
    }
    .el-message-box__wrapper {
        z-index: 999999 !important;
    }
</style>