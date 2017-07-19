<template>
    <div class="domain-header">
        <Row>
            <Col span="24">
                <div class="header-main">
                    {{ $t('Hebei key domain name monitoring system') }}
                    <div class="header-ext">
                        <ul class="list">
                            <li class="item-border"></li>
                            <li class="item message" style="width: 46px; text-align: center;">
                                <i class="fa fa-commenting-o"></i>
                                <span class="message-num">99+</span>
                                <ul class="message-list">
                                    <li class="message-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        1111111
                                    </li>
                                    <li class="message-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        222222
                                    </li>
                                    <li class="message-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        333333
                                    </li>
                                    <li class="message-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        4444444
                                    </li>
                                    <li class="message-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        55555555
                                    </li>
                                </ul>
                            </li>
                            <li class="item-border"></li>
                            <li class="item user">
                                <span class="user-text">
                                    <span class="user-level">系统超级管理员</span>
                                    <span class="user-name">您好, 李小白</span>
                                </span>
                                <span class="user-pic">
                                    <img src="http://www.feizl.com/upload2007/2012_01/120115153325811.jpg" alt="头像" />
                                </span>
                                <ul class="user-list">
                                    <li class="user-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        1111111
                                    </li>
                                    <li class="user-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        222222
                                    </li>
                                    <li class="user-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        33333
                                    </li>
                                    <li class="user-item">
                                        <i class="fa fa-hand-peace-o"></i>
                                        444444
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: [],
        methods: {

        }
    }
</script>

<style lang="scss">

    .header-main {
        height: 45px;
        padding-left: 18px;
        font: bold 15px/45px 'Microsoft YaHei';
        background-color: #219cea;
        color: white;
    }
    .header-ext {
        float: right;
        height: 100%;
        .list {
            height: 100%;
            .item-border {
                border-left: 1px solid #1283c9;
                border-right: 1px solid #5eb6ee;
                display: inline-block;
                width: 2px;
                height: 100%;
                float: left;
            }
            .item {
                height: 100%;
                float: left;
                cursor: pointer;
                padding: 0 15px;
            }
            .item.user {
                position: relative;
                .user-list {
                    position: absolute;
                    left: 12px;
                    top: 100%;
                    display: none;
                    width: 140px;
                    background-color: #219cea;
                    border-radius: 0 0 6px 6px;
                    .user-item {
                        padding: 0 10px;
                        border-top: 1px solid #eae9e9;
                        border-bottom: 1px solid #237fb9;
                        -webkit-transition: all .3s ease;
                        -moz-transition: all .3s ease;
                        -ms-transition: all .3s ease;
                        -o-transition: all .3s ease;
                        transition: all .3s ease;
                        & > i {
                            margin-right: 5px;
                        }
                        &:first-child {
                            border-top: 0;
                        }
                        &:last-child {
                            border-radius: 0 0 6px 6px;
                        }
                        &:hover {
                            background-color: #1986cc;
                        }
                    }
                }
                &:hover {
                    .user-list {
                        display: block;
                    }
                }
                .user-text {
                    display: inline-block;
                    line-height: 17px;
                    font-size: 10px;
                    position: relative;
                    top: -9px;
                    & > span {
                        display: block;
                    }
                }
                img {
                    height: 100%;
                    border-radius: 50%;
                    padding: 6px;
                }
            }
            .item.message {
                position: relative;
                margin-right: 20px;
                & > i {
                    margin-top: 5px;
                    font-size: 32px;
                }
                .message-num {
                    width: 31px;
                    height: 18px;
                    position: absolute;
                    right: -16px;
                    top: 4px;
                    background-color: red;
                    border-radius: 10px;
                    line-height: 16px;
                    font-size: 10px;
                    font-weight: normal;
                }
            }
        }
    }

</style>