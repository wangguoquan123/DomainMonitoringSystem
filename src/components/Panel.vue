<template>
    <div class="panel">
        <domain-header></domain-header>
        <domain-sidebar></domain-sidebar>
        <el-row class="contents" :style="{ 'margin-left': slidebarStatic ? '200px' : '60px' }">
            <el-col :span="24" class="customer_contents" v-loading.body='false'>
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
            }
        }
    }

</script>

<style lang="scss">
    body, ul {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    .customer_contents {
        position: relative;
    }
    .ivu-spin-fix {
        display: block;
        .ivu-spin-main {
            display: inline-block;
            width: auto;
            height: auto;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
    }
    .contents-icon-load {
        animation: iconLoad 1s linear infinite;
    }
    @keyframes iconLoad {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>