<template>
    <div class="login">
        <Row class="header bg">
            <h1>河北重点域名监控系统</h1>
            <div class="switch-language">
                <a href="javascript:void(0);" @click="changeLanguages('cn')">中</a>
                &nbsp;/&nbsp;
                <a href="javascript:void(0);" @click="changeLanguages('en')">En</a>
            </div>
        </Row>
        <div class="content rel">
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
                            <Input type="text" v-model="loginForm.user" :placeholder="$t('Please enter your account number')" size="large">
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
            return {
                lang: '',
                rememberPassword: false,
                loginForm: {
                    user: '',
                    password: ''
                },
                ruleLogin: {
                    user: [
                        { required: true, message: this.$t('Please fill in the user name'), trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$t('Please fill in the password'), trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('Password length must not be less than 6 bits'), trigger: 'blur' }
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //window.localStorage.setItem('user', this.loginForm.user);
                        this.$Message.success('提交成功!');
                        this.$router.push('/panel');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        mounted() {
            //JSON.parse(localStorage.getItem('data'));
            this.lang = this.$i18n;
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
        height: 600px;
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
                padding: 34px 74px;
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
