<template>
    <div class="domain-bar">
        首页
        <span class="bar-border">/</span>
        {{ strOff ? newText['one'][num_one] : levelText.one }}
        <span class="bar-border">/</span>
        {{ strOff ? newText['two'][num_two] : levelText.two }}
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
                    two: ['展示', '查询', 'localDNS', '配置', '告警']
                },
                strOff: false,
                num_one: '',
                num_two: ''
            }
        },
        props: [''],
        methods: {

        },
        mounted() {
            if (window.localStorage.activeId) {
                this.strOff = true;
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