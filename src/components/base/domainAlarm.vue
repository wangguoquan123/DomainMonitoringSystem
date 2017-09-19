<template>
    <div class="domain-alarm">
        <div class="tool-group" style="padding-bottom: 30px;">
            <el-button type="primary" @click="dialogAddEmailEvent">添加邮箱</el-button>
            <el-button type="danger" @click="removeEmailEvent" :disabled="selectRow.length ? false : true" :loading="removeLoading">删除邮箱</el-button>
            <span class="border-style"></span>
            <el-button type="primary" @click="submitAll" :disabled="submitDisabled">提交更改</el-button>
        </div>
        <div class="content" style="height: 720px; overflow-x: hidden; overflow-y: auto;">
            <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    height="720"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    label="操作"
                    sortable="custom">
                    <template scope="scope">
                        <div class="button-group">
                            <el-button
                                size='mini'
                                type='danger'
                                @click="removeData(scope.$index, scope.row)"><i class="fa fa-trash-o fa-sm"></i>删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加邮箱" :visible.sync="dialogAddEmail" size="tiny">
            <p style="padding-bottom: 25px;">
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个邮箱地址, 然后回车换行.<br/>
                例如: admin@163.com, 邮箱地址不允许出现特殊字符. 比如: &*$()等.
            </p>
            <textarea id="textarea" v-model="value"></textarea>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="dialogAddEmail = false;">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitEmail">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import enLang from 'element-ui/lib/locale/lang/en'
    import zhLang from 'element-ui/lib/locale/lang/zh-CN'
    import locale from 'element-ui/lib/locale'

    export default {
        data() {
            const validateEmail = (rule, value, callback) => {
                let _reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (value === '') {
                    callback(new Error('邮箱地址不允许为空'));
                } else if (value.length < 3) {
                    callback(new Error('邮箱地址长度不允许小于2位'));
                } else if (!_reg.test(value)) {
                    callback(new Error('邮箱地址格式不正确'));
                } else {
                    callback();
                }
            };
            return {
                dialogAddEmail: false,
                lang: '',
                tableData: [],
                addEmail: {
                    email: ''
                },
                getArr: [],
                ruleEmail: {
                    email: [
                        {required: true, trigger: 'blur', validator: validateEmail}
                    ]
                },
                selectRow: [],
                value: '',
                buttonStatus: false,
                tableDataLoading: false,
                submitDisabled: true,
                removeLoading: false
            }
        },
        props: [],
        mounted() {
            this.lang = this.$i18n;
            let _csrftoken = window.localStorage.getItem('scrftoken');
            if (!_csrftoken) {
                this.$goRoute('/');
                window.localStorage.setItem('scrftoken', '');
                return false;
            }
            if (this.lang.locale === 'en') {
                locale.use(enLang);
            } else if (this.lang.locale === 'cn') {
                locale.use(zhLang);
            }
            this.getData();
        },
        methods: {
            handleSelectionChange(value) {
                this.selectRow = value;
            },
            modifyData(index, row) {
                let _that = this;
                _that.$prompt('请输入要修改的邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确',
                    inputPlaceholder: '请输入要修改的邮箱地址',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(({ value }) => {
                    for (let i = 0, len = _that.tableData.length; i < len; i ++) {
                        if (_that.tableData[i].email === value) {
                            _that.$message.error('要修改的邮箱地址已重在, 请返回重新修改!');
                            return false;
                        }
                    }
                    _that.$message({
                        type: 'success',
                        message: '邮箱修改成功!'
                    });
                    _that.tableData[index].email = value;
                }).catch(() => {
                    _that.$message({
                        type: 'info',
                        message: '取消邮箱修改!'
                    });
                });
            },
            removeData(index, row) {
                this.$confirm('此操作将会删除此行的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1000);
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.tableData.splice(index, 1);
                    this.getArr.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            dialogAddEmailEvent() {
                this.value = '';
                this.dialogAddEmail = true;
            },
            submitEmail(formName) {
                let _arr = [];
                let _off = true;
                let _newValue = this.value.split('\n');
                _newValue = Array.from(new Set(_newValue));
                console.log(typeof this.getArr, this.getArr instanceof Array);
                for (let i = 0, len = _newValue.length; i < len; i ++) {
                    for (let k = 0, len = this.tableData.length; k < len; k ++) {
                        if (_newValue[i] === this.tableData[k].email) {
                            this.$message.error('要添加的邮箱地址【'+ _newValue[i] +'】重复, 请返回修改!');
                            return false;
                        }
                    }
                    if (this.verifyEmail(this.toTrim(_newValue[i]))) {
                        _arr.push({
                            email: this.toTrim(_newValue[i])
                        });
                        this.getArr.push(_newValue[i]);
                    } else {
                        if (_newValue[i] === '') {
                            this.$message.error('邮箱地址列表不允许出现空格(回车换行符)!');
                        } else {
                            this.$message.error('【' + _newValue[i] +'】邮箱格式不正确, 请返回重新修改!');
                        }
                        _off = false;
                        return false;
                    }
                }
                if (_off) {
                    for (let j = 0, len = _arr.length; j < len; j ++) {
                        this.tableData.unshift(_arr[j]);
                    }
                }
                this.dialogAddEmail = false;
                this.submitDisabled = false;
            },
            verifyEmail(str) {
                let _reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                return _reg.test(str);
            },
            toTrim(str) {
                let result;
                result = str.replace(/\s/g,"");
                return result;
            },
            removeEmailEvent() {
                let _that = this;
                this.$confirm('此操作将要删除所选的邮箱地址, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1500);
                        } else {
                            done();
                        }
                    }
                }).then(() => {

                    for (let i = 0, len = _that.selectRow.length; i < len; i ++) {
                        for (let j = 0, len = _that.tableData.length; j < len; j ++) {
                            if (_that.selectRow[i].email === _that.tableData[j].email) {
                                _that.tableData.splice(j, 1);
                                break;
                            }
                        }
                    }
                    _that.getArr = [];
                    for (let k = 0, len = _that.tableData.length; k < len; k ++) {
                        _that.getArr.push(_that.tableData[k].email);
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getData() {
                let _that = this;
                _that.$http.post(this.domainApi.warning_show).then(response => {
                    if (response.body instanceof Array) {
                        _that.getArr = response.body;
                    } else {
                        if (JSON.parse(response.body).length) {
                            _that.getArr = JSON.parse(response.body);
                        } else {
                            _that.getArr = [];
                        }
                    }
                    if (_that.getArr.length) {
                        for (let i = 0, len = _that.getArr.length; i < len; i ++) {
                            _that.tableData.unshift({
                                email: _that.getArr[i]
                            });
                        }
                    }
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                    setTimeout(function() {
                        window.localStorage.setItem('scrftoken', '');
                        _that.$goRoute('/');
                    }, 2000);
                })
            },
            submitAll() {
                let _that = this;
                _that.submitDisabled = true;
                _that.$http.post(_that.domainApi.warning_conf, _that.getArr).then(response => {
                    _that.$message.success('提交成功');
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                });
            }
        }
    }
</script>

<style lang="scss">
    .el-table .info-row td {
        background: red !important;
    }
    .el-table .positive-row td {
        background: green !important;
    }
    .domain-alarm {
        padding: 30px;
        p {
            margin: 0;
            position: relative;
            background-color: #c3eae9;
            padding: 6px 20px 6px !important;
            margin-bottom: 25px;
            border-radius: 6px;
            color: #5d5959;
        }
        .el-input {
            width: 73%;
            display: inline-block;
        }
        .el-select {
            width: 73%;
            .el-input {
                width: auto;
            }
        }
        .el-form-item__error {
            margin-left: 66px;
        }
        .button-group {
            button {
                font-size: 14px;
                i {
                    margin-right: 4px;
                }
            }
        }
        textarea {
            width: calc(100% - 30px);
            resize: none;
            border: 1px solid #ccc;
            height: 200px;
            padding: 15px;
            font-size: 14px;
            outline: none;
            font-family: "Microsoft YaHei";
            -webkit-transition: all .3s ease;
            -moz-transition: all .3s ease;
            -ms-transition: all .3s ease;
            -o-transition: all .3s ease;
            transition: all .3s ease;
            &:focus {
                border-color: #4a94e0;
            }
        }
        .border-style {
            display: inline-block;
            width: 1px;
            background-color: #ccc;
            height: 35px;
            vertical-align: middle;
            margin: 0 10px;
        }
    }
    .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
</style>