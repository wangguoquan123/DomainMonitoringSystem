<template>
    <div class="domain-configure">
        <el-button type="primary" @click="ShowModel">批量添加</el-button>
        <span class="border-style"></span>
        <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                accept="text"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="fileChangeUpload"
                ref="fileUpload"
                style="display: inline-block;">
            <el-button slot="trigger" type="primary">导入</el-button>
            <el-button style="margin-left: 10px;" type="success" @click="submitUpload" :disabled="isFinish">开始上传</el-button>
        </el-upload>
        <span class="border-style"></span>
        <el-button type="danger" @click="removeSelectData" :disabled="selectRow.length === 0">删除</el-button>
        <el-button type="primary" :disabled="selectRow.length === 0" @click="dialogModifyData = true;">修改</el-button>
        <span class="border-style"></span>
        <el-button type="info" @click="handleDownload('selectRow')" :disabled="selectRow.length === 0">导出所选</el-button>
        <el-button type="info" @click="handleDownload">导出全部</el-button>
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
            <el-table-column
                label="操作"
                sortable="custom">
                <template scope="scope">
                    <el-button
                        size='mini'
                        type='primary'
                        @click="modifyDomainConfigure(scope.$index, scope.row)"><i class="fa fa-undo fa-sm"></i>修改时间</el-button>
                    <el-button
                        size='mini'
                        type='danger'
                        @click="removeDomainConfigure(scope.$index, scope.row)"><i class="fa fa-trash-o fa-sm"></i>删除</el-button>
                </template>
            </el-table-column>
        </data-tables>
        <el-dialog title="批量添加" :visible.sync="dialogTableVisible" size="tiny">
            <p>
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个域名, 然后回车换行.<br/>
                注意: 只能包含26个英文字母(a~Z)、数字(0~9)、以及"-"(英文连接号), 不允许出现空格及特殊字符(如！、￥|、%等).
            </p>
            <div style="margin-bottom: 1em; text-align: center; overflow: hidden;">
                <div>
                    <div style="text-align: center; margin-bottom: 10px;">设置起始时间、结束时间</div>
                    <el-date-picker
                        v-model="dialogDateTimeValue"
                        type="datetimerange"
                        placeholder="选择时间范围"
                        @change="dialogDateTimeChange">
                    </el-date-picker>
                </div>
            </div>
            <textarea id="textarea" v-model="value"></textarea>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="hideModel">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitConfig">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量修改数据" :visible.sync="dialogModifyData" size="tiny" class="modify-data">
            <span>时间范围：</span>
            <el-date-picker
                v-model="dialogModifyDate"
                type="datetimerange"
                placeholder="选择时间范围"
                @change="modifyDateChange">
            </el-date-picker>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="dialogModifyData = false;">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="modifySelectData">修改</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改时间" :visible.sync="modifySingleData" size="tiny" class="single-data">
            <span class="text">时间范围：</span>
            <el-date-picker
                    v-model="modifyDateTimeValue"
                    type="datetimerange"
                    placeholder="选择时间范围"
                    @change="modifyDateTimeChange">
            </el-date-picker>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="modifySingleData = false;">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitModify">修改</el-button>
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
                dialogModifyData: false,
                modifySingleData: false,
                isFinish: true,
                value: '',
                lang: '',
                dialogDateTimeValue: [],
                dialogTimeValue: {
                    start: '',
                    end: ''
                },
                isShow: true,
                faChevronDown: 'fa-chevron-down',
                faChevronUp: 'fa-chevron-up',
                ipsShow: true,
                ips_faChevronDown: 'fa-chevron-down',
                ips_faChevronUp: 'fa-chevron-up',
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
                },
                uploadTextValue: [],
                selectRow: [],
                dialogModifyDate: [],
                modifyData: {
                    start: '',
                    end: ''
                },
                modifySingle: {
                    start: '',
                    end: ''
                },
                modifyDateTimeValue: [],
                modifyIndex: ''
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
            let _dateObj = this.getNowDate();
            this.dialogDateTimeValue[0] = _dateObj.startDate;
            this.dialogDateTimeValue[1] = _dateObj.endDate;
            this.dialogTimeValue.start = _dateObj.startDate.substring(0, _dateObj.startDate.length - 3);
            this.dialogTimeValue.end = _dateObj.endDate.substring(0, _dateObj.endDate.length - 3);
            this.dialogModifyDate[0] = _dateObj.startDate;
            this.dialogModifyDate[1] = _dateObj.endDate;
            this.modifyData.start = _dateObj.startDate.substring(0, _dateObj.startDate.length - 3);
            this.modifyData.end = _dateObj.endDate.substring(0, _dateObj.endDate.length - 3);
        },
        methods: {
            ipsToggles() {
                this.isShow = !this.isShow;
            },
            ipstoToggles() {
                this.ipsShow = !this.ipsShow;
            },
            ShowModel() {
                this.dialogTableVisible = true;
            },
            hideModel() {
                this.value = '';
                this.dialogTableVisible = false;
            },
            handleSelectionChange(selection) {
                this.selectRow = selection;
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
            dialogDateTimeChange(value) {
                if (value === '') {
                    this.dialogTimeValue.start = '';
                    this.dialogTimeValue.end = '';
                    return false;
                }
                let _arr = value.split(' ');
                let _start = _arr[0] + ' ' + _arr[1].substring(0, _arr[1].length - 3);
                let _end = _arr[3] + ' ' + _arr[4].substring(0, _arr[4].length - 3);
                if ((Date.parse(_end) / 1000) < (Date.parse(_start) / 1000)) {
                    this.$message.error('请设置域名的起始、结束日期段.');
                    return false;
                }
                this.dialogTimeValue.start = _start;
                this.dialogTimeValue.end = _end;
            },
            submitConfig() {
                if (this.dialogTimeValue.start === '') {
                    this.$message.error('请设置域名的起始、结束日期段.');
                    return false;
                }
                let _arr = [];
                let _off = true;
                let _newValue = this.value.split('\n');
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
                            start: this.dialogTimeValue.start,
                            end: this.dialogTimeValue.end
                        });
                    } else {
                        if (_newValue[i] === '') {
                            this.$message.error('域名列表不允许出现空格(回车换行符)!');
                        } else {
                            this.$message.error('【' + _newValue[i] +'】域名格式不正确, 请返回重新修改!');
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
            fileChangeUpload(file) {
                const isTXT = file.raw.type === 'text/plain';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isTXT) {
                    this.$message.error('上传的文件格式只允许 TXT 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传的文件大小不能超过 2MB!');
                    return false;
                }
                return isTXT && isLt2M;
            },
            submitUpload() {
                // 点击上传文件
                this.$refs.fileUpload.submit();
            },
            getNowDate() {
                let totalDate = new Date();
                let year = totalDate.getFullYear();
                let month = totalDate.getMonth() < 10 ? '0' + (totalDate.getMonth() + 1) : totalDate.getMonth() + 1;
                let date = totalDate.getDate();
                let hour = totalDate.getHours() < 10 ? '0' + totalDate.getHours() : totalDate.getHours();
                let minute = totalDate.getMinutes() < 10 ? '0' + totalDate.getMinutes() : totalDate.getMinutes();
                let second = totalDate.getSeconds() < 10 ? '0' + totalDate.getSeconds() : totalDate.getSeconds();
                let startDate = year + '-' + month + '-' + (date - 1) + ' ' + hour + ':' + minute + ':' + second;
                let endDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
                return {
                    startDate: startDate,
                    endDate: endDate
                };
            },
            removeSelectData() {
                let _that = this;
                let _arr = [];
                _that.selectRow.forEach(function(value) {
                    _arr.push(value.domain);
                });
                if (!_arr.length) {
                    this.$message.error('请选择要删除的数据');
                    return false;
                }
                this.$confirm('此操作将删除所选数据, 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(_arr);
                }).catch(() => {
                    this.$message('已取消删除');
                });
            },
            modifySelectData() {
                for (let i = 0, len = this.selectRow.length; i < len; i ++) {
                    for (let k = 0, len = this.tableData.length; k < len; k ++) {
                        if (this.selectRow[i].domain === this.tableData[k].domain) {
                            this.tableData[k].start = this.modifyData.start;
                            this.tableData[k].end = this.modifyData.end;
                        }
                    }
                }
                this.dialogModifyData = false;
            },
            modifyDateChange(value) {
                let _arr = value.split(' ');
                let _start = _arr[0] + ' ' + _arr[1].substring(0, _arr[1].length - 3);
                let _end = _arr[3] + ' ' + _arr[4].substring(0, _arr[4].length - 3);
                if ((Date.parse(_end) / 1000) < (Date.parse(_start) / 1000)) {
                    this.$message.error('选择的时间范围有错误, 请返回重新修改.');
                    return false;
                }
                this.modifyData.start = _start;
                this.modifyData.end = _end;
            },
            handleDownload(type) {
                let _that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    const tHeader = ['域名', '起始时间', '结束时间'];
                    const filterVal = ['domain', 'start', 'end'];
                    const data = _that.formatJson(filterVal, type === 'selectRow' ? _that.selectRow : _that.tableData);
                    export_json_to_excel(tHeader, data, 'table数据');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            modifyDomainConfigure(index, row) {
                // 修改单条配置信息数据
                //console.log(index, row);
                this.modifyIndex = index;
                this.modifySingleData = true;
                this.modifyDateTimeValue = [];
                this.modifySingle.start = this.tableData[index].start;
                this.modifySingle.end = this.tableData[index].end;
                this.modifyDateTimeValue[0] = this.tableData[index].start;
                this.modifyDateTimeValue[1] = this.tableData[index].end;
            },
            submitModify() {
                // 提交单条修改
                if (this.modifySingle.start === '') {
                    this.$message.error('时间范围不允许为空!');
                    return false;
                }
                this.$confirm('此操作新修改的时间将会覆盖旧时间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('修改成功!');
                    this.tableData[this.modifyIndex].start = this.modifySingle.start;
                    this.tableData[this.modifyIndex].end = this.modifySingle.end;
                    this.modifySingleData = false;
                }).catch(() => {
                    this.$message.info('已取消修改!');
                });
                return false;
            },
            modifyDateTimeChange(value) {
                if (value) {
                    let _arr = value.split(' ');
                    let _start = _arr[0] + ' ' + _arr[1].substring(0, _arr[1].length - 3);
                    let _end = _arr[3] + ' ' + _arr[4].substring(0, _arr[4].length - 3);
                    if ((Date.parse(_end) / 1000) < (Date.parse(_start) / 1000)) {
                        this.$message.error('选择的时间范围有错误, 请返回重新修改.');
                        this.modifyDateTimeValue = [];
                        this.modifyDateTimeValue[0] = this.modifySingle.start;
                        this.modifyDateTimeValue[1] = this.modifySingle.end;
                        return false;
                    }
                    this.modifySingle.start = _start;
                    this.modifySingle.end = _end;
                } else {
                    this.modifySingle = {
                        start: '',
                        end: ''
                    };
                }
            },
            removeDomainConfigure(index, row) {
                // 删除单条配置信息数据
                this.$confirm('此操作将会删除此行的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
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
            readUploadFile(file) {
                let _that = this;
                let reader = new FileReader();
                let _arr = [];
                let _obj = {};
                reader.onload = function(evt) {
                    console.log(JSON.parse(evt.target.result));
                    _arr = evt.target.result.split(',');
                    console.log(_arr);
                    for (let i = 0, len = _arr.length; i < len; i ++) {
                        //console.log(_arr[i]);
                        if (i % 3 === 0) {
                            _obj.end = _arr[i];
                            _that.uploadTextValue.push(_obj);
                        } else {
                            _obj.domain = _arr[i].domain;
                            _obj.start = _arr[i].start;
                        }
                    }
                };
                reader.readAsText(file.raw);
            }
        }
    }
</script>

<style lang="scss">
    .domain-configure {
        padding: 30px;
        p {
            margin: 0;
            padding: 0;
        }
        .ibagese, .ipsgase {
            text-align: center;
            cursor: pointer;
        }
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
    .border-style {
        display: inline-block;
        width: 1px;
        background-color: #ccc;
        height: 35px;
        vertical-align: middle;
        margin: 0 10px;
    }
    .single-data {
        .text {
            width: 80px;
        }
    }
</style>