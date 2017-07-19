<template>
    <div class="login">
        <Row class="header bg">
            <h1>{{ $t('Hebei key domain name monitoring system') }}</h1>
            <div class="switch-language">
                <a href="javascript:void(0);" @click="changeLanguages('cn')">中</a>
                &nbsp;/&nbsp;
                <a href="javascript:void(0);" @click="changeLanguages('en')">En</a>
            </div>
        </Row>
        <div class="content rel" :style="{ height: contentHeight }">
            <div class="translate-center content-main">
                <div class="login-form-header rel">
                    <div class="main translate-center">
                        <div class="icon"></div>
                        <div class="text">
                            <p>{{ $t('User login') }}</p>
                            <p>Backend Of DeepShift</p>
                        </div>
                    </div>
                </div>
                <div class="login-form-content">
                    <Form ref="loginForm" :model="loginForm" :rules="ruleLogin">
                        <Form-item prop="user">
                            <Input type="text" v-model="loginForm.user" :placeholder="$t('Please enter a user name in the mailbox format')" size="large">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" v-model="loginForm.password" :placeholder="$t('Please input a password')" size="large">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item>
                            <Checkbox v-model="rememberPassword">{{ $t('Remember password') }}</Checkbox>
                        </Form-item>
                        <Form-item class="login-btn-group">
                            <Button type="primary" class="login-btn" @click="handleSubmit('loginForm')">{{ $t('Logon immediately') }}</Button>
                        </Form-item>
                    </Form>
                </div>
            </div>
        </div>
        <Row class="footer bg">
            <Col :span="24">
                备案, 联系我们, 微信公众号
            </Col>
        </Row>
    </div>
</template>

<script>

    import 'font-awesome/css/font-awesome.min.css';

    export default {
        name: 'login',
        data () {
            const validateUser = (rule, value, callback) => {
                let _reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (value === '') {
                    callback(new Error(this.$t('User name cannot be empty')));
                } else if (value.length < 3) {
                    callback(new Error(this.$t('User name length must not be less than 2 bits')));
                } else if (!_reg.test(value)) {
                    callback(new Error(this.$t('The user name entered is not in the correct format')));
                } else {
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                let _reg = /^[a-zA-Z]\w{5,17}$/;
                if (value === '') {
                    callback(new Error(this.$t('Password cannot be empty')));
                } else if (!_reg.test(value)) {
                    callback(new Error(this.$t('The letter begins with 6-18 digits, only with letters, numbers, and underscores')));
                } else {
                    callback();
                }
            };
            return {
                lang: '',
                contentHeight: 0,
                rememberPassword: false,
                loginForm: {
                    user: '',
                    password: ''
                },
                ruleLogin: {
                    user: [
                        { required: true, trigger: 'blur', validator: validateUser }
                    ],
                    password: [
                        { required: true, trigger: 'blur', validator: validatePassword }
                    ]
                }
            }
        },
        computed: {

        },
        methods: {
            changeLanguages(str) {
                window.localStorage.setItem('x-language', str);
                this.$i18n.locale = str;
            },
            handleSubmit(name) {
                let _that = this;
                _that.$refs[name].validate((valid) => {
                    if (valid) {
                        if (_that.rememberPassword) {
                            window.localStorage.setItem('userInfo', '');
                            window.localStorage.setItem('userInfo', JSON.stringify({
                                name: _that.loginForm.user,
                                password: _that.loginForm.password
                            }));
                        }
                        _that.$Message.success(_that.$t('Login successful'));
//                        _that.$http.post('http://192.168.13.154/login', this.loginForm).then(response => {
//                            console.log(response);
//                        });
                        setTimeout(function() {
                            window.localStorage.setItem('activeId', '1-1');
                            _that.$router.push('/panel/show');
                        }, 2000);
                    } else {
                        _that.$Message.error(_that.$t('Login failure'));
                    }
                })
            },
            updateHeight (){
                let sideHeight = document.documentElement.clientHeight || document.body.clientHeight;
                this.contentHeight = sideHeight + 'px';
            },
            isAutoFill() {
                let _userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                if (_userInfo) {
                    this.loginForm.user = _userInfo.name;
                    this.loginForm.password = _userInfo.password;
                }
            }
        },
        mounted() {
            let _that = this;
            this.lang = this.$i18n;
            this.updateHeight();
            this.isAutoFill();
            window.addEventListener('resize', () => {_that.updateHeight()});
        }
    }

</script>

<style lang="scss">

    .rel {
        position: relative;
    }
    .translate-center {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .bg {
        background-color: #292727;
        padding: 15px 20px;
        color: white;
        font-size: 18px;
    }
    .content {
        background-image: url('../assets/login_bg.png');
        .content-main {
            width: 390px;
            .login-form-header {
                height: 148px;
                background-image: url('../assets/login_form_header.png');
                border-radius: 6px 6px 0 0;
                .text {
                    text-align: center;
                    font-size: 18px;
                    color: white;
                }
            }
            .login-form-content {
                padding: 34px 50px;
                background-color: white;
                border-radius: 0 0 6px 6px;
                .login-btn-group {
                    text-align: center;
                    margin-bottom: 0;
                    .login-btn {
                        background-color: #56a8fb;
                        border: 0;
                        padding: 10px 56px;
                        -webkit-border-radius: 20px;
                        -moz-border-radius: 20px;
                        border-radius: 20px;
                        -webkit-transition: all .3s ease;
                        -moz-transition: all .3s ease;
                        -ms-transition: all .3s ease;
                        -o-transition: all .3s ease;
                        transition: all .3s ease;
                        &:hover {
                            background-color: #2f90f3;
                        }
                    }
                }
            }
        }
    }
    .header {
        &:after {
            content: "";
            display: block;
            clear: both;
            height: 0;
            zoom: 1;
        }
        h1 {
            float: left;
            font-size: 24px;
        }
        .switch-language {
            float: right;
            margin-top: 6px;
            a {
                font-size: 14px;
            }
        }
    }
    .ivu-icon {
        font-size: 22px;
        color: rgb(22, 137, 251);
    }
    .ivu-input-group-large > .ivu-input-group-prepend {
        padding: 6px 10px;
    }

</style>
