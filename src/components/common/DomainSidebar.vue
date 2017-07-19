<template>
    <div class="domain-sidebar">
        <Row>
            <Col span="3">
                <div class="nav-toggle">
                    <Icon type="navicon-round"></Icon>
                    功能菜单
                </div>
                <Menu theme="dark" :open-names="['1']" :active-name="activeNum" accordion :style="{ height: side_height }" @on-select="selectItem">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            基本功能
                        </template>
                        <Menu-item name="1-1">
                            <i class="fa fa-angle-double-right"></i>
                            展示
                        </Menu-item>
                        <Menu-item name="1-2">
                            <i class="fa fa-angle-double-right"></i>
                            查询
                        </Menu-item>
                        <Menu-item name="1-3">
                            <i class="fa fa-angle-double-right"></i>
                            配置
                        </Menu-item>
                        <Menu-item name="1-4">
                            <i class="fa fa-angle-double-right"></i>
                            告警
                        </Menu-item>
                    </Submenu>
                </Menu>
            </Col>
        </Row>
    </div>
</template>

<script>

    const menuMap = {
        '1-1': '/panel/show',
        '1-2': '/panel/query',
        '1-3': '/panel/configure',
        '1-4': '/panel/alarm'
    };

    export default {
        data() {
            return {
                side_height: '',
                activeNum: '1-1',
                domainBar: {
                    one: ['基础功能'],
                    two: ['展示', '查询', '配置', '告警']
                }
            }
        },
        props: [],
        methods: {
            updateHeight () {
                let sideHeight = document.documentElement.clientHeight || document.body.clientHeight;
                this.side_height = sideHeight + 'px';
            },
            selectItem(value) {
                this.$goRoute(menuMap[value]);
            }
        },
        computed: {
            getMenuId() {
                return this.$store.state.activeId;
            }
        },
        watch: {
            getMenuId(value) {
                let _oneNum = value.split('-')[0];
                let _twoNum = value.split('-')[1];
                this.activeNum = value;
                window.localStorage.setItem('activeId', value);
                this.$store.commit('domainBarActive', {
                    one: this.domainBar.one[_oneNum-1],
                    two: this.domainBar.two[_twoNum-1]
                });
            }
        },
        mounted() {
            let _this = this;
            _this.updateHeight();
            if (window.localStorage.getItem('activeId')) {
                this.activeNum = window.localStorage.getItem('activeId');
            }
            window.addEventListener('resize', () => {_this.updateHeight()});
        }
    }
</script>

<style lang="scss">

    .domain-sidebar {
        width: 240px;
        float: left;
    }
    .ivu-menu-dark {
        min-height: 500px;
        overflow: auto;
    }
    .nav-toggle {
        width: 240px;
        background: #303642;
        font-size: 14px;
        color: rgba(255,255,255,.7);
        padding: 14px 24px;
        position: relative;
        cursor: default;
        z-index: 1;
        transition: all .2s ease-in-out;
        border-bottom: 1px solid #21252d;
        & > i {
            margin-right: 8px;
        }
    }
    .ivu-menu-dark,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
        background-color: #303642;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
        background-color: #262a33;
        .ivu-menu-submenu-title {
            border-top: 1px solid #343a46;
            border-bottom: 1px solid #2b313c;
        }
    }
    .ivu-menu-vertical {
        .ivu-menu-submenu-title {
            border-top: 1px solid #444a56;
            border-bottom: 1px solid #21252d;
        }
    }
    .domain-configure {
        margin-left: 240px;
    }

</style>