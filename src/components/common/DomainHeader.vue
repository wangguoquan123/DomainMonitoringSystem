<template>
    <div class="domain-header">
        <Row>
            <Col span="24">
                <div class="header-main">
                    {{ $t('Hebei key domain name monitoring system') }}
                    <div class="header-ext">
                        <ul class="list">
                            <li class="item message" style="width: 46px; text-align: center;">
                                <i class="fa fa-commenting-o"></i>
                                <span class="message-num">99+</span>
                                <ul class="message-list">
                                    <li class="message-item">1111111111</li>
                                    <li class="message-item">2222222222</li>
                                    <li class="message-item">33333333333</li>
                                    <li class="message-item">444444444444</li>
                                    <li class="message-item">55555555555</li>
                                </ul>
                            </li>
                            <li class="item user">
                                <span class="user-text">
                                    <span class="user-level">系统超级管理员</span>
                                    <span class="user-name">您好, 李小白</span>
                                </span>
                                <span class="user-pic">
                                    <img src="http://www.feizl.com/upload2007/2012_01/120115153325811.jpg" alt="头像" />
                                </span>
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
            .item {
                height: 100%;
                float: left;
                cursor: pointer;
            }
            .item.user {
                img {
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .item.message {
                position: relative;
                & > i {
                    margin-top: 5px;
                    font-size: 32px;
                }
                .message-num {
                    width: 31px;
                    height: 18px;
                    position: absolute;
                    right: -8px;
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