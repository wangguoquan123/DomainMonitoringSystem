<template>
    <div class="domain-configure">
        <div class="button-group" style="padding-bottom: 25px;">
            <el-button type="primary" @click="ShowModel">批量添加</el-button>
            <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--accept="xlsx"-->
                <!--:auto-upload="true"-->
                <!--:show-file-list="false"-->
                <!--:on-change="fileChangeUpload"-->
                <!--ref="fileUpload"-->
                <!--style="display: inline-block;">-->
                <!--<el-button slot="trigger" type="primary">导入Excel</el-button>-->
            <!--</el-upload>-->
            <span class="border-style"></span>
            <el-button type="danger" @click="removeSelectData" :disabled="selectRow.length === 0">删除</el-button>
            <el-button type="primary" :disabled="selectRow.length === 0" @click="dialogModifyData = true;">修改</el-button>
            <span class="border-style"></span>
            <!--<el-button type="primary" @click="handleDownload('selectRow')" :disabled="selectRow.length === 0">导出所选</el-button>-->
            <el-button type="primary" @click="handleDownload">导出</el-button>
            <span class="border-style"></span>
            <el-button type="primary" @click="submitAll" :loading="submitAllStatus" :disabled="submitAllDisabled">提交更改</el-button>
        </div>
        <el-table
            :data="tableData"
            :default-sort = "{prop: 'Time', order: 'descending'}"
            stripe
            border
            highlight-current-row
            style="width: 100%"
            height="697"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column
                prop="domain"
                sortable
                label="域名">
            </el-table-column>
            <el-table-column
                prop="begin"
                sortable
                label="起始时间">
                <template scope="scope">
                    <span>{{ scope.row.begin | convertDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="end"
                sortable
                label="终止时间">
                <template scope="scope">
                    <span>{{ scope.row.end | convertDate }}</span>
                </template>
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
        </el-table>
        <el-dialog title="批量添加" :visible.sync="dialogTableVisible" size="tiny">
            <p>
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个域名, 然后回车换行.<br/>
                注意: 只能包含26个英文字母(a~Z)、数字(0~9)、以及"-"(英文连接号), 不允许出现空格及特殊字符(如！、￥|、%等).
            </p>
            <div style="margin-bottom: 1em; overflow: hidden;">
                <div>
                    <div style="text-align: center; margin: 0 10px;">设置起始时间、结束时间</div>
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
                submitAllDisabled: true,
                dialogTableVisible: false,
                dialogModifyData: false,
                modifySingleData: false,
                isFinish: true,
                value: '',
                lang: '',
                tableHeight: '',
                dialogDateTimeValue: [],
                dialogTimeValue: {
                    begin: '',
                    end: ''
                },
                isShow: true,
                faChevronDown: 'fa-chevron-down',
                faChevronUp: 'fa-chevron-up',
                ipsShow: true,
                ips_faChevronDown: 'fa-chevron-down',
                ips_faChevronUp: 'fa-chevron-up',
                tableData: [],
                searchObj: {
                    placeholder: '',
                    offset:20,
                    width:4
                },
                uploadTextValue: [],
                selectRow: [],
                dialogModifyDate: [],
                modifyData: {
                    begin: '',
                    end: ''
                },
                modifySingle: {
                    begin: '',
                    end: ''
                },
                modifyDateTimeValue: [],
                modifyIndex: '',
                selectRowIndex: [],
                submitAllStatus: false,
                modifyTableLen: 0,
                rABS: false,
                completeText: ''
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
            let _this = this;
            _this.updateHeight();
            window.addEventListener('resize', () => {_this.updateHeight()});
            let _dateObj = this.getNowDate();
//            _this.dialogDateTimeValue[0] = _dateObj.start;
//            _this.dialogDateTimeValue[1] = _dateObj.end;
//            _this.dialogTimeValue.begin = _dateObj.start;
//            _this.dialogTimeValue.end = _dateObj.end;
            _this.dialogModifyDate[0] = _dateObj.start;
            _this.dialogModifyDate[1] = _dateObj.end;
            _this.modifyData.begin = _dateObj.start;
            _this.modifyData.end = _dateObj.end;
            _this.getData();
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
            updateHeight () {
                let sideHeight = document.documentElement.clientHeight || document.body.clientHeight;
                this.tableHeight = (sideHeight - 60) + 'px';
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
            dialogDateTimeChange(value) {
                if (value === '') {
                    this.dialogTimeValue.begin = '';
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
                this.dialogTimeValue.begin = _start;
                this.dialogTimeValue.end = _end;
            },
            submitConfig() {
                if (this.dialogTimeValue.begin === '') {
                    this.$message.error('请设置域名的起始、结束日期段.');
                    return false;
                }
                let _arr = [];
                let _off = true;
                let _newValue = this.value.split('\n');
                _newValue = Array.from(new Set(_newValue));
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
                            begin: this.dateStrContent(this.dialogTimeValue.begin),
                            end: this.dateStrContent(this.dialogTimeValue.end)
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
                        this.tableData.push(_arr[j]);
                    }
                }
                this.submitAllDisabled = false;
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
                //const isTXT = file.raw.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                //const isLt2M = file.size / 1024 / 1024 < 2;

//                if (!isTXT) {
//                    this.$message.error('上传的文件格式只允许 XLSX 格式!');
//                    return false;
//                }
//                if (!isLt2M) {
//                    this.$message.error('上传的文件大小不能超过 2MB!');
//                    return false;
//                }
                this.readUploadFile(file.raw);
//                return isTXT && isLt2M;
            },
            submitUpload() {
                // 点击上传文件
                this.$refs.fileUpload.submit();
            },
            getNowDate(value) {
                let totalDate = '';
                if (value || value === 0) {
                    totalDate = new Date(value);
                } else {
                    totalDate = new Date();
                }

                let year = totalDate.getFullYear();
                let month = totalDate.getMonth();
                month = month < 10 ? '0' + month : month;
                let date = totalDate.getDate();
                date = date < 10 ? '0' + date : date;
                let hour = totalDate.getHours();
                hour = hour < 10 ? '0' + hour : hour;
                let minute = totalDate.getMinutes();
                minute = minute < 10 ? '0' + minute : minute;
                let start = year + '-' + month + '-' + (date - 1) + ' ' + hour + ':' + minute;
                let end = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
                if (value || value === 0) {
                    return end;
                } else {
                    return {
                        start: start,
                        end: end
                    };
                }
            },
            removeSelectData() {
                if (!this.selectRow.length) {
                    this.$message.error('请选择要删除的数据');
                    return false;
                }
                this.$confirm('此操作将删除所选数据, 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i = 0, len = this.selectRow.length; i < len; i ++) {
                        for (let j = 0, len = this.tableData.length; j < len; j ++) {
                            if (this.selectRow[i].domain === this.tableData[j].domain) {
                                this.tableData.splice(j, 1);
                                break;
                            }
                        }
                    }
                    this.$message.success('删除成功');
                }).catch(() => {
                    this.$message('已取消删除');
                });
            },
            modifySelectData() {
                // 提交单条修改
                if (this.modifyData.begin === '' || this.modifyData.end === '') {
                    this.$message.error('时间范围不允许为空!');
                    return false;
                }
                this.$confirm('此操作新修改的时间将会覆盖旧时间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('修改成功!');
                    for (let i = 0, len = this.selectRow.length; i < len; i ++) {
                        for (let k = 0, len = this.tableData.length; k < len; k ++) {
                            if (this.selectRow[i].domain === this.tableData[k].domain) {
                                this.tableData[k].begin = this.dateStrContent(this.modifyData.begin);
                                this.tableData[k].end = this.dateStrContent(this.modifyData.end);
                            }
                        }
                    }
                    this.dialogModifyData = false;
                    this.submitAllDisabled = false;
                }).catch(() => {
                    this.$message.info('已取消修改!');
                });
            },
            modifyDateChange(value) {
                let _arr = value.split(' ');
                let _start = _arr[0] + ' ' + _arr[1].substring(0, _arr[1].length - 3);
                let _end = _arr[3] + ' ' + _arr[4].substring(0, _arr[4].length - 3);
                if ((Date.parse(_end) / 1000) < (Date.parse(_start) / 1000)) {
                    this.$message.error('选择的时间范围有错误, 请返回重新修改.');
                    return false;
                }
                this.modifyData.begin = _start;
                this.modifyData.end = _end;
            },
            handleDownload(type) {
                console.log(type);
                let _that = this;
                let _arr = [];
                let _target = type === 'selectRow' ? _that.selectRow : _that.tableData;
                for (let i = 0, len = _target.length; i < len; i ++) {
                    //console.log(_that.dateStrContent(_that.minuteContvert(_target[i].begin)));
                    _arr.push({
                        domain: _target[i].domain,
                        begin: _that.getNowDate(_that.minuteContvert(_target[i].begin)),
                        end: _that.getNowDate(_that.minuteContvert(_target[i].end))
                    });
                }
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    const tHeader = ['域名', '起始时间', '终止时间'];
                    const filterVal = ['domain', 'begin', 'end'];
                    const data = _that.formatJson(filterVal, _arr);
                    export_json_to_excel(tHeader, data, '数据导出表格');
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
                this.modifySingle.begin = this.getNowDate(this.minuteContvert(this.tableData[index].begin));
                this.modifySingle.end = this.getNowDate(this.minuteContvert(this.tableData[index].end));
                this.modifyDateTimeValue[0] = this.getNowDate(this.minuteContvert(this.tableData[index].begin));
                this.modifyDateTimeValue[1] = this.getNowDate(this.minuteContvert(this.tableData[index].end));
            },
            minuteContvert(value) {
                return value * 1000 * 60;
            },
            dateStrContent(value) {
                let _str = new Date(value).getTime() / 1000 / 60;
                return _str;
            },
            submitModify() {
                // 提交单条修改
                if (this.modifySingle.begin === '') {
                    this.$message.error('时间范围不允许为空!');
                    return false;
                }
                this.$confirm('此操作新修改的时间将会覆盖旧时间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('修改成功!');
                    this.tableData[this.modifyIndex].begin = this.dateStrContent(this.modifySingle.begin);
                    this.tableData[this.modifyIndex].end = this.dateStrContent(this.modifySingle.end);
                    this.modifySingleData = false;
                    this.submitAllDisabled = false;
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
                        this.modifyDateTimeValue[0] = this.modifySingle.begin;
                        this.modifyDateTimeValue[1] = this.modifySingle.end;
                        return false;
                    }
                    this.modifySingle.begin = _start;
                    this.modifySingle.end = _end;
                } else {
                    this.modifySingle = {
                        begin: '',
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
                    this.submitAllDisabled = false;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            readUploadFile(obj) {
                let _that = this;
                if (typeof require !== 'undefined') {
                    var XLSX = require('xlsx');
                }
                if (!obj) {
                    return;
                }
                let f = obj;
                let reader = new FileReader();
                reader.onload = function(event) {
                    let _data = event.target.result;
//                    console.log(this.XLSX)
                    if(_that.rABS) {
                        _that.completeText = XLSX.read(btoa(_that.fixdata(_data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        _that.completeText = XLSX.read(_data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    console.log(JSON.stringify( XLSX.utils.sheet_to_json(_that.completeText.Sheets[_that.completeText.SheetNames[0]]) ));
//                    console.log(JSON.parse(evt.target.result));
//                    _arr = evt.target.result.split(',');
//                    console.log(evt);
//                    for (let i = 0, len = _arr.length; i < len; i ++) {
//                        //console.log(_arr[i]);
//                        if (i % 3 === 0) {
//                            _obj.end = _arr[i];
//                            _that.uploadTextValue.push(_obj);
//                        } else {
//                            _obj.domain = _arr[i].domain;
//                            _obj.begin = _arr[i].begin;
//                        }
//                    }
                };
                reader.readAsText(obj);
                console.log();
            },
            fixdata (data) {
                //文件流转BinaryString
                let o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },
            submitAll() {
                let _that = this;
                _that.submitAllStatus = true;
                _that.$message('正在提交');
                _that.$http.post(this.domainApi.domain_conf, _that.tableData).then(response => {
                    _that.$message.success('提交成功');
                    setTimeout(function() {
                        _that.submitAllStatus = false;
                        window.location.reload();
                    }, 2000);
                }).catch(error => {
                    _that.submitAllStatus = false;
                    _that.$message.success('提交失败');
                });
            },
            getData() {
                let _that = this;
                _that.$http.post(this.domainApi.domain_show).then(response => {
                    _that.tableData = [];
                    if (response.body === '') {
                        _that.tableData = [];
                    } else if (response.body instanceof Array) {
                        _that.tableData = response.body;
                    } else {
                        if (JSON.parse(response.body).length) {
                            _that.tableData = JSON.parse(response.body);
                        } else {
                            _that.tableData = '';
                        }
                    }
                    _that.submitDisabled = _that.tableData.length;
                    _that.$store.commit('loadingActive', false);
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                    setTimeout(function() {
                        window.localStorage.setItem('scrftoken', '');
                        _that.$goRoute('/');
                    }, 2000);
                });
            },
            jsonConvertArray(value) {
                let _arr = JSON.parse(value);
                return _arr;
            },
            getRowIndex(row) {
                let _arr = this.tableData;
                for (let i = 0, len = _arr.length; i < len; i ++) {
                    if (row.domain === _arr[i].domain) {
                        if (this.contains(this.selectRowIndex, i)) {
                            this.removeByValue(this.selectRowIndex, i)
                        } else {
                            this.selectRowIndex.push(i);
                        }
                        break;
                    }
                }
            },
            removeByValue(arr, val) {
                for(let i=0; i<arr.length; i++) {
                    if(arr[i] === val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            contains(arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
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
        .el-table {
            overflow: auto;
            tr {
                cursor: pointer;
            }
        }
    }
    .el-dialog__body {
        p {
            margin-top: 0;
            position: relative;
            background-color: #c3eae9;
            padding: 6px 20px 6px !important;
            margin-bottom: 25px;
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