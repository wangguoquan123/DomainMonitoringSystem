<template>
    <div class="domain-bar">
        首页
        <span class="bar-border">/</span>
        {{ domainText.one ? domainText.one : newText['one'][num_one] }}
        <span class="bar-border">/</span>
        {{ domainText.two ? domainText.two : newText['two'][num_two] }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                levelText: {
                    one: '基础功能',
                    two: '展示'
                },
                newText: {
                    one: ['基础功能'],
                    two: ['展示', '查询', 'localDNS', '域名', '告警']
                },
                num_one: '',
                num_two: '',
                strOff: false
            }
        },
        props: [''],
        computed: {
            domainText() {
                return this.$store.state.domainText;
            }
        },
        methods: {

        },
        mounted() {
            if (window.localStorage.activeId) {
                let _num = window.localStorage.getItem('activeId');
                this.num_one = Number(_num.split('-')[0]) - 1;
                this.num_two = Number(_num.split('-')[1]) - 1;
            }
        }
    }
</script>

<style lang="scss">
    .domain-bar {
        line-height: 50px;
        font-size: 14px;
        color: #868585;
        padding-left: 20px;
        box-shadow: 0 0 4px 1px rgba(45, 140, 240, 0.2);
    }
    .bar-border {
        margin: 0 8px;
    }
</style>