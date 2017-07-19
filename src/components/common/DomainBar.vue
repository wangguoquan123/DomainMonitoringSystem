<template>
    <div class="domain-bar">
        首页
        <span class="bar-border">/</span>
        {{ levelText.one }}
        <span class="bar-border">/</span>
        {{ levelText.two }}
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
        computed: {
            levelText() {
                console.log(this.$store.state.domainBar);
                return this.$store.state.domainBar;
            }
        }
    }
</script>

<style lang="scss">
    .domain-bar {
        margin-left: 240px;
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