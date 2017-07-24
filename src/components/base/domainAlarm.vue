<template>
    <div class="domain-alarm">
        <el-button type="primary" @click="dialogAddEmailEvent">添加邮箱</el-button>
        <el-button type="danger" @click="removeEmailEvent">删除邮箱</el-button>
        <data-tables
                :data="tableData"
                @selection-change="handleSelectionChange"
                @row-click="rowClickChange"
                :has-action-col='false'
                :search-def="searchObj"
                :data-type="getSearchText(lang.locale)"
                :pagination-def='getPaginationDef()'
                stripe
                border
                fit
                style="width: 100%">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column
                prop="email"
                sortable
                label="邮箱地址">
            </el-table-column>
            <el-table-column
                prop="role"
                sortable
                label="角色">
            </el-table-column>
            <el-table-column
                label="操作"
                sortable="custom">
                <template scope="scope">
                    <el-button
                        size='mini'
                        type='primary'
                        @click="modifyData(scope.$index, scope.row)"><i class="fa fa-undo fa-sm"></i>修改</el-button>
                    <el-button
                        size='mini'
                        type='danger'
                        @click="removeData(scope.$index, scope.row)"><i class="fa fa-trash-o fa-sm"></i>删除</el-button>
                </template>
            </el-table-column>
        </data-tables>
        <el-dialog title="添加邮箱" :visible.sync="dialogAddEmail" size="small" class="email-data">
            <el-form ref="addEmail" :model="addEmail" :rules="ruleEmail">
                <el-form-item prop="email" style="width: 30%; display: inline-block;">
                    <span class="text" style="margin: 0 10px;">邮箱：</span>
                    <el-input v-model="addEmail.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item prop="role" style="width: 30%; display: inline-block;">
                    <span class="text" style="margin: 0 10px;">角色：</span>
                    <el-select v-model="addEmail.role" placeholder="请选择角色">
                        <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="login-btn-group" style="text-align: right; margin-top: 15px;">
                    <el-button @click="dialogAddEmail = false;">{{ $t('Cancel') }}</el-button>
                    <el-button type="primary" @click="submitEmail('addEmail')">添加</el-button>
                </el-form-item>
            </el-form>
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
                tableData: [
                    {
                        email: 'gyby5911@alibaba.com.cn',
                        role: 'Owner'
                    },
                    {
                        email: 'dgjs0769@126.com',
                        role: 'Owner'
                    },
                    {
                        email: 'hr@bmschina.com',
                        role: 'Owner'
                    },
                    {
                        email: 'zhaomingwqw@163.com',
                        role: 'Owner'
                    },
                    {
                        email: 'ruihongfair@163.com',
                        role: 'Owner'
                    },
                    {
                        email: 'bzfangzheng@126.com',
                        role: 'Owner'
                    },
                    {
                        email: 'zsstssjxzzyxgs@3158.com',
                        role: 'Owner'
                    },
                    {
                        email: 'sdzgjx@126.com',
                        role: 'Owner'
                    },
                    {
                        email: 'sale@xinhuajg.com',
                        role: 'Owner'
                    },
                    {
                        email: '222@126.com',
                        role: 'Owner'
                    },
                    {
                        email: 'ivanoowin@hotmail.com',
                        role: 'Owner'
                    },
                    {
                        email: 'chinawutong@126.com',
                        role: 'Owner'
                    },
                    {
                        email: 'info@hbzrzz.cn',
                        role: 'Owner'
                    },
                ],
                searchObj: {
                    placeholder: '',
                    offset:20,
                    width:4
                },
                addEmail: {
                    email: '',
                    role: ''
                },
                roleList: [
                    {
                        value: 'Owner',
                        label: '拥有者'
                    },
                    {
                        value: 'Controller',
                        label: '管理者'
                    }
                ],
                ruleEmail: {
                    email: [
                        {required: true, trigger: 'blur', validator: validateEmail}
                    ],
                    role: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ]
                },
                selectRow: []
            }
        },
        props: [],
        mounted() {
            this.lang = this.$i18n;
            if (this.lang.locale === 'en') {
                locale.use(enLang);
            } else if (this.lang.locale === 'cn') {
                locale.use(zhLang);
            }
        },
        methods: {
            handleSelectionChange(value) {
                console.log(value);
                this.selectRow = value;
            },
            rowClickChange(row, index, arr){
                //console.log(row, index, arr);
            },
            getSearchText(value) {
                let _inputSearch = document.getElementsByClassName('el-input__inner')[0];
                this.toText = value;
                if (value === 'en') {
                    _inputSearch.setAttribute('placeholder', 'Please input searchkey');
                } else if (value === 'cn') {
                    _inputSearch.setAttribute('placeholder', '请输入搜索关键字');
                }
            },
            getPaginationDef(){
                return {
                    layout: 'total, prev, pager, next, jumper, sizes',
                    pageSize: 10,
                    pageSizes: [10, 20, 50,100],
                    currentPage: 1
                }
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
                            }, 3000);
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
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            dialogAddEmailEvent() {
                this.dialogAddEmail = true;
                this.addEmail.email = '';
                this.addEmail.role = '';
            },
            submitEmail(formName) {
                let _that = this;
                _that.$refs[formName].validate((valid) => {
                    if (valid) {
                        for (let i = 0, len = _that.tableData.length; i < len; i ++) {
                            if (_that.tableData[i].email === _that.addEmail.email) {
                                _that.$message.error('要添加的域名已存在!');
                                return false;
                            }
                        }
                        _that.$message.success('添加成功!');
                        _that.tableData.unshift({
                            email: _that.addEmail.email,
                            role: _that.addEmail.role
                        });
                        _that.dialogAddEmail = false;
                    } else {
                        _that.$message.error('添加失败!');
                        return false;
                    }
                });
            },
            removeEmailEvent() {
                let _that = this;
                this.$confirm('此操作将要删除所选的邮箱地址, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    console.log(_that.selectRow)
                    for (let i = 0, len = _that.selectRow.length; i < len; i ++) {
                        for (let k = 0, len = _that.tableData.length; k < len; k ++) {
                            if (_that.selectRow[i].email === _that.tableData[k].email) {
                                console.log(k, 1);
                                _that.tableData.splice(k, 1);
                            }
                        }
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
    }
    .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
</style>