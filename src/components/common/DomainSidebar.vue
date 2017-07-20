<template>
    <div class="domain-sidebar" :class="navStatus ? 'opened' : 'closed'" :style="{ 'width': navStatus ? '200px' : '60px' }">
        <el-row>
            <el-col>
                <div class="nav-toggle">
                    <div class="toggle-main">
                        <i class="fa fa-gear"></i>
                        <span class="nav-title-text">功能菜单</span>
                        <span class="toggleIcon" @click="navToggle">
                            <i class="fa fa-navicon"></i>
                        </span>
                    </div>
                </div>
                <el-menu theme="dark"
                    width="100%"
                    unique-opened
                    :default-openeds="activeArray"
                    :default-active="activeNum"
                    :style="{ height: side_height }"
                    @select="selectItem">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="fa fa-square"></i>
                            <span class="nav-title-text">基本功能</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">展示</span>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">查询</span>
                        </el-menu-item>
                        <el-menu-item index="1-3">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">配置</span>
                        </el-menu-item>
                        <el-menu-item index="1-4">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">告警</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
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
                activeArray: ['1'],
                domainBar: {
                    one: ['基础功能'],
                    two: [
                        ['展示', '查询', '配置', '告警']
                    ]
                },
                navOff: true
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
            },
            navToggle() {
                this.navOff = !this.navOff;
                this.$store.commit('navToggleActive', this.navOff);
            }
        },
        computed: {
            getMenuId() {
                return this.$store.state.activeId;
            },
            navStatus() {
                return this.$store.state.navStatus;
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
                    two: this.domainBar.two[_oneNum-1][_twoNum-1]
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
        width: 200px;
        float: left;
    }
    .el-menu--dark {
        min-height: 700px;
        background-color: #303642;
    }
    .nav-toggle {
        background: #303642;
        color: white;
        font-size: 14px;
        position: relative;
        cursor: default;
        z-index: 1;
        transition: all .2s ease-in-out;
        border-bottom: 1px solid #21252d;
        & > i {
            margin-right: 8px;
        }
        .toggle-main {
            padding: 14px 20px;
            & > i {
                margin-right: 5px;
            }
        }
    }
    .el-menu-item, .el-submenu__title {
        padding: 14px 24px;
        height: 48px;
        line-height: 20px;
        & > i {
            margin-right: 5px;
        }
    }
    .toggleIcon {
        position: absolute;
        right: 7px;
        top: 0;
        background-color: #303642;
        width: 48px;
        height: 48px;
        font-size: 34px;
        text-align: center;
        border-radius: 0 6px 6px 0;
        border-left: 1px solid #2f2f2f;
        cursor: pointer;
    }
    .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
        background-color: #303642;
        color: white;
    }
    .el-menu--dark .el-submenu__title {
        border-bottom: 1px solid #21252d;
        border-top: 1px solid #424040;
    }
    .el-submenu.is-active .el-submenu__title {
        border-bottom: 1px solid #21252d;
    }
    .el-submenu.is-opened {
        .el-menu-item {
            background-color: #262a32;
        }
    }
    .el-submenu.is-opened .el-menu-item.is-active,
    .el-menu--dark .el-submenu .el-menu .el-menu-item:hover{
        background-color: #219cea;
    }
    .el-submenu .el-menu-item {
        height: 47px;
        line-height: 47px;
    }
    .domain-sidebar.closed {
        .nav-title-text {
            display: none;
        }
        .el-submenu__title {
            & > .el-submenu__icon-arrow {
                display: none;
            }
        }
        .el-menu--dark {
            .el-submenu {
                position: relative;
                .el-menu {
                    position: absolute;
                    left: 60px;
                    top: 0;
                    display: none !important;
                    z-index: 99;
                }
            }
        }
        .el-submenu.is-active {
            .el-submenu__title {
                background-color: #2a7ace;
            }
        }
        .el-submenu:hover {
            .el-menu {
                display: block !important;
            }
        }
    }

</style>