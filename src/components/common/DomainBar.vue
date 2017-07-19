<template>
    <div class="domain-bar">
        首页
        <span class="bar-border">/</span>
        {{ text.one ? text.one : levelText.one }}
        <span class="bar-border">/</span>
        {{ text.two ? text.two : levelText.two }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                levelText: {
                    one: '基础功能',
                    two: '展示'
                }
            }
        },
        props: [''],
        methods: {

        },
        mounted() {

        },
        computed: {
            text() {
                return this.$store.state.domainText;
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