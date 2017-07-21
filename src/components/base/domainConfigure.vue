<template>
    <div class="domain-configure">
        <el-button type="primary" @click="ShowModel">批量添加</el-button>
        <el-button type="primary" @click="ShowImportModel">批量添加</el-button>
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
                prop="domain"
                sortable
                label="域名">
            </el-table-column>
            <el-table-column
                prop="start"
                sortable
                label="起始时间">
            </el-table-column>
            <el-table-column
                prop="end"
                sortable
                label="结束时间">
            </el-table-column>
        </data-tables>
        <el-dialog title="批量添加" :visible.sync="dialogTableVisible" size="tiny">
            <p>
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个域名, 然后回车换行.<br/>
                注意: 只能包含26个英文字母(a~Z)、数字(0~9)、以及"-"(英文连接号), 不允许出现空格及特殊字符(如！、￥|、%等).
            </p>
            <div style="margin-bottom: 1em; text-align: center; overflow: hidden;">
                <div style="float: left; width: 50%;">
                    <div style="text-align: center; margin-bottom: 10px;">设置起始日期、结束日期</div>
                    <el-date-picker
                        v-model="dialogDateValue"
                        type="daterange"
                        placeholder="选择日期范围"
                        @change="changeDate">
                    </el-date-picker>
                </div>
                <div style="float: left; width: 50%;">
                    <div style="text-align: center; margin-bottom: 10px;">设置起始时间、结束时间</div>
                    <el-time-picker
                        is-range
                        v-model="timeValue"
                        placeholder="选择时间范围"
                        @change="changeTime">
                    </el-time-picker>
                </div>
            </div>
            <textarea id="textarea" v-model="value"></textarea>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="hideModel">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitConfig">添加</el-button>
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
                dialogDateValue: {
                    start: '',
                    end: ''
                },
                timeValue: [],
                dialogTimeValue: {
                    start: '',
                    end: ''
                },
                tableData: [
                    {
                        domain: 'www.baidu.com',
                        start: '2017-05-10 10:21',
                        end: '2017-05-12 09:33'
                    },
                    {
                        domain: 'www.qq.com',
                        start: '2017-01-12 02:21',
                        end: '2017-01-13 02:33'
                    },
                    {
                        domain: 'baidu.com',
                        start: '2017-04-16 10:21',
                        end: '2017-04-18 10:33'
                    },
                    {
                        domain: 'www.sina.com',
                        start: '2017-04-14 02:03',
                        end: '2017-04-16 02:14'
                    },
                    {
                        domain: 'www.pconline.com.cn',
                        start: '2017-03-17 03:27',
                        end: '2017-03-18 03:32'
                    },
                    {
                        domain: 'www.element.com',
                        start: '2017-03-28 12:32',
                        end: '2017-05-12 13:02'
                    },
                    {
                        domain: 'www.ifeng.com',
                        start: '2017-05-14 05:19',
                        end: '2017-05-16 05:23'
                    },
                    {
                        domain: 'www.163.com',
                        start: '2017-04-27 11:01',
                        end: '2017-04-30 18:03'
                    },
                    {
                        domain: 'www.youku.com',
                        start: '2017-06-15 17:33',
                        end: '2017-07-01 18:34'
                    },
                    {
                        domain: 'www.suning.com',
                        start: '2017-08-20 04:33',
                        end: '2017-08-22 06:44'
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
                this.value = '';
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
                    pageSize: 8,
                    pageSizes: [8, 20, 50, 100],
                    currentPage: 1
                }
            },
            submitConfig() {
                if (this.dialogDateValue.start === '' || this.dialogTimeValue.start === '') {
                    this.$message.error('请设置域名的起始、结束日期段或时间段.');
                    return false;
                }
                let _arr = [];
                let _off = true;
                let _startStr = '', _endStr = '';
                let _newValue = this.value.split('\n');
                _startStr = this.dialogDateValue.start + ' ' + this.dialogTimeValue.start;
                _endStr = this.dialogDateValue.end + ' ' + this.dialogTimeValue.end;
                _startStr = _startStr.substring(0, _startStr.length - 3);
                _endStr = _endStr.substring(0, _endStr.length - 3);
                for (let i = 0, len = _newValue.length; i < len; i ++) {
                    for (let k = 0, len = this.tableData.length; k < len; k ++) {
                        if (_newValue[i] === this.tableData[k].domain) {
                            this.$message.error('要添加的域名【'+ _newValue[i] +'】重复, 请返回修改!');
                            return false;
                        }
                    }
                    if (this.domainFormat(this.toTrim(_newValue[i]))) {
                        _arr.push({
                            domain: this.toTrim(_newValue[i]),
                            start: _startStr,
                            end: _endStr
                        });
                    } else {
                        if (_newValue[i] === '') {
                            this.$message.error('域名不能为空!');
                        } else {
                            this.$message.error('【' + _newValue[i] +'】域名格式不正确, 请返回重新修改!');
                        }
                        _off = false;
                        return false;
                    }
                }
                if (_off) {
                    for (let j = 0, len = _arr.length; j < len; j ++) {
                        this.tableData.push(_arr[j]);
                    }
                }
                this.hideModel();
            },
            toTrim(str) {
                let result;
                result = str.replace(/\s/g,"");
                return result;
            },
            domainFormat(str) {
                let _reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                return _reg.test(str);
            },
            changeDate(value) {
                let _arr = value.split(' ');
                this.dialogDateValue.start = _arr[0];
                this.dialogDateValue.end = _arr[2];
            },
            changeTime(value) {
                let _arr = value.split(' ');
                this.dialogTimeValue.start = _arr[0];
                this.dialogTimeValue.end = _arr[2];
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