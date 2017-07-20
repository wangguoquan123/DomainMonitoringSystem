<template>
    <div class="domain-configure">
        <el-button type="primary" @click="ShowModel">导入域名信息</el-button>
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
                prop="date"
                sortable
                label="时间">
            </el-table-column>
            <el-table-column
                prop="name"
                sortable
                label="名称">
            </el-table-column>
            <el-table-column
                prop="address"
                sortable
                label="地址">
            </el-table-column>
        </data-tables>
        <el-dialog title="导入域名" :visible.sync="dialogTableVisible" size="tiny">
            <p>
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个域名, 然后回车换行.<br/>
                注意: 只能包含26个英文字母(a~Z)、数字(0~9)、以及"-"(英文连接号), 不允许出现空格及特殊字符(如！、￥|、%等).
            </p>
            <textarea id="textarea" v-model="value"></textarea>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="hideModel">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitConfig">{{ $t('Import') }}</el-button>
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
            return {
                dialogTableVisible: false,
                value: '',
                lang: '',
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-05',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1521 弄'
                    },
                    {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 153 弄'
                    },
                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1545 弄'
                    },
                    {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1588 弄'
                    },
                    {
                        date: '2016-05-09',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1562 弄'
                    },
                    {
                        date: '2016-05-10',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 15245 弄'
                    },
                    {
                        date: '2016-05-11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 15666 弄'
                    },
                    {
                        date: '2016-05-12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 158888 弄'
                    }
                ],
                searchObj: {
                    placeholder: '',
                    offset:20,
                    width:4
                }
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
            ShowModel() {
                this.dialogTableVisible = true;
            },
            hideModel() {
                this.dialogTableVisible = false;
            },
            handleSelectionChange(value) {
                //console.log(value);
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
            submitConfig() {
                let _arr = [];
                let _off = true;
                let _newValue = this.value.split('\n');
                for (let i = 0, len = _newValue.length; i < len; i ++) {
                    if (this.domainFormat(this.toTrim(_newValue[i]))) {
                        _arr.push(this.toTrim(_newValue[i]));
                    } else {
                        this.$message.error('【' + _newValue[i] +'】域名格式不正确, 请返回重新修改!');
                        _off = false;
                        return false;
                    }
                }
                if (_off) {
                    console.log(_arr);
                }
            },
            toTrim(str) {
                let result;
                result = str.replace(/\s/g,"");
                return result;
            },
            domainFormat(str) {
                let _reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                return _reg.test(str);
            }
        }
    }
</script>

<style lang="scss">
    .domain-configure {
        padding: 30px;
    }
    .el-dialog__body {
        p {
            margin-top: 0;
            position: relative;
            background-color: #c3eae9;
            padding: 6px 20px 6px;
            border-radius: 6px;
            color: #5d5959;
            & > i {
                position: absolute;
                left: 5px;
                top: 9px;
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
    }
    .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
</style>