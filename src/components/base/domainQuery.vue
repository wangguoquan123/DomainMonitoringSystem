<template>
    <div class="domain-query">
        <div class="query-tool" style="padding-bottom: 30px;">
            <div class="date" style="display: inline-block; width: 375px;">
                <span>时间</span>
                <el-date-picker
                    v-model="dataTimeValue"
                    type="datetimerange"
                    placeholder="选择时间范围"
                    @change="dataTimeChange">
                </el-date-picker>
            </div>
            <span class="border-style"></span>
            <div class="domain" style="display: inline-block; width: 260px;">
                <span>域名</span>
                <el-input v-model="inputGroup.Domain" placeholder="请输入域名" style="width: 78%;"></el-input>
            </div>
            <span class="border-style"></span>
            <div class="dns" style="display: inline-block;">
                <span>DNS</span>
                <el-input v-model="inputGroup.LocalDns" placeholder="请输入DNS地址" style="width: 74%;"></el-input>
            </div>
            <span class="border-style"></span>
            <el-checkbox v-model="inputGroup.Warnning">异常</el-checkbox>
            <span class="border-style"></span>
            <el-button type="primary" @click="queryData">查询</el-button>
            <span class="border-style"></span>
            <el-button type="primary" @click="handleDownload">导出</el-button>
        </div>
        <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            stripe
            border
            style="width: 100%"
            height="700"
            v-loading="tableDataLoading"
            element-loading-text="拼命加载中">
            <el-table-column
                prop="Time"
                label="时间"
                sortable>
                <template scope="scope">
                    <span>{{ scope.row.Time | convertDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="LocalDns"
                label="LocalDns"
                sortable>
            </el-table-column>
            <el-table-column
                prop="Domain"
                label="域名"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.Domain.length">
                        <el-tooltip :content="scope.row.Domain" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.Domain }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="FinshCname"
                label="CName"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.FinshCname.length">
                        <el-tooltip :content="scope.row.FinshCname" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.FinshCname }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="IPs"
                label="IPs"
                sortable>
                <template scope="scope">
                    <ip-show :ipsLength="jsonConvertArray(scope.row.IPs)" v-if="jsonConvertArray(scope.row.IPs)"></ip-show>
                    <span v-else>空</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="CnameList"
                label="CnameList"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.CnameList.length">
                        <el-tooltip :content="scope.row.CnameList" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.CnameList }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="LocalErr"
                label="LocalErr"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.LocalErr.length">
                        <el-tooltip :content="scope.row.LocalErr" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.LocalErr }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="NsName"
                label="NsName"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.NsName.length">
                        <el-tooltip :content="scope.row.NsName" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.NsName }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="NsIp"
                label="NsIp"
                sortable>
                <template scope="scope">
                    <span v-if="scope.row.NsIp.length">{{ scope.row.NsIp }}</span>
                    <span v-else>空</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="NsRecord"
                label="NsRecord"
                sortable>
                <template scope="scope">
                    <ip-show :ipsLength="jsonConvertArray(scope.row.NsRecord)" v-if="scope.row.NsRecord.length"></ip-show>
                    <span v-else>空</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="NsErr"
                label="NsErr"
                sortable>
                <template scope="scope">
                    <div v-if="scope.row.NsErr.length">
                        <el-tooltip :content="scope.row.NsErr" placement="top-end" effect="light">
                            <span class="data-tooltip">{{ scope.row.NsErr }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="inputGroup.Page"
            :page-sizes="pageSizeList"
            :page-size="inputGroup.PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="inputGroup.Count">
        </el-pagination>
    </div>
</template>

<script>

    import enLang from 'element-ui/lib/locale/lang/en'
    import zhLang from 'element-ui/lib/locale/lang/zh-CN'
    import locale from 'element-ui/lib/locale'

    import ipShow from '@/components/common/IpsList'

    export default {
        data() {
            return {
                lang: '',
                domainInput: '',
                tableData: [],
                searchObj: {
                    placeholder: '请输入搜索关键字',
                    offset:20,
                    width:4
                },
                inputGroup: {
                    Start: '',
                    End: '',
                    Domain: '',
                    LocalDns: '',
                    Page: 1,
                    PageSize: 20,
                    Count: 0,
                    Warnning: false
                },
                dataTimeValue: [],
                tableDataLoading: false,
                pageSizeList: [20, 50, 100, 300, 500]
            }
        },
        props: [],
        components: {
            ipShow
        },
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
            //let _date = this.getNowDate();
            //this.dataTimeValue = [_date.start, _date.end];
            this.$store.commit('loadingActive', false);
        },
        methods: {
            handleSelectionChange(value) {
                //console.log(value);
            },
            rowClickChange(row, index, arr){
                //console.log(row, index, arr);
            },
            handleSizeChange(value) {
                this.inputGroup.PageSize = value;
                this.getData(this.getObj());
                //pageSize 改变时会触发, 每页条数size
            },
            handleCurrentChange(value) {
                this.inputGroup.Page = value;
                this.getData(this.getObj());
                //currentPage 改变时会触发, 当前页currentPage
            },
            dataTimeChange(value) {
                if (value === '' || value === undefined) {
                    this.inputGroup.Start = '';
                    this.inputGroup.End = '';
                    return false;
                }
                let _arr = value.split(' ');
                let _start = _arr[0] + ' ' + _arr[1].substring(0, _arr[1].length - 3);
                let _end = _arr[3] + ' ' + _arr[4].substring(0, _arr[4].length - 3);
                if ((Date.parse(_end) / 1000) < (Date.parse(_start) / 1000)) {
                    this.$message.error('请设置域名的起始、结束日期段.');
                    return false;
                }
                this.inputGroup.Start = _start;
                this.inputGroup.End = _end;
            },
            getData(obj) {
                let _that = this;
                _that.tableDataLoading = true;

                _that.$http.post(this.domainApi.search, obj).then(response => {
                    _that.inputGroup.Count = response.body.Count;
                    _that.tableData = response.body.Record;
                    setTimeout(function() {
                        _that.tableDataLoading = false;
                    }, 1000);
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                    _that.tableData = [];
                });
            },
            getNowDate(value) {
                let totalDate = '';
                if (value || value === 0) {
                    totalDate = new Date(value);
                } else {
                    totalDate = new Date();
                }

                let year = totalDate.getFullYear();
                let month = totalDate.getMonth() + 1;
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
            minuteContvert(value) {
                return value * 1000 * 60;
            },
            dateStrContent(value) {
                let _str = new Date(value).getTime() / 1000 / 60;
                return _str;
            },
            tableRowClassName(row, index) {
                if (row.Status === 1) {
                    return 'error-style'
                }
                return '';
            },
            domainFormat(str) {
                let _reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                return _reg.test(str);
            },
            ipFormat(str) {
                let _reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                return _reg.test(str);
            },
            jsonConvertArray(value) {
                let _arr = JSON.parse(value);
                return _arr;
            },
            queryData() {
                let _that = this;
                if (_that.inputGroup.Start === '' || _that.inputGroup.End === '') {
                    _that.$message.error('您输入的时间范围不允许为空');
                    return false;
                }
                if (_that.inputGroup.Domain !== '') {
                    if (!_that.domainFormat(_that.inputGroup.Domain)) {
                        _that.$message.error('您输入的域名格式不正确');
                        return false;
                    }
                }
                if (_that.inputGroup.LocalDns !== '') {
                    if (!_that.ipFormat(_that.inputGroup.LocalDns)) {
                        _that.$message.error('您输入的IP地址不正确');
                        return false;
                    }
                }
                this.inputGroup.Count = 0;
                this.getData(this.getObj());
            },
            getObj() {
                this.inputGroup.Start = this.dateStrContent(this.dataTimeValue[0]);
                this.inputGroup.End = this.dateStrContent(this.dataTimeValue[1]);
                return this.inputGroup;
            },
            handleDownload() {
                let _that = this;
                let _arr = [];
                let _target = _that.tableData;
                for (let i = 0, len = _target.length; i < len; i ++) {
                    _arr.push({
                        Time: _that.getNowDate(_that.minuteContvert(_target[i].Time)),
                        LocalDns: _target[i].LocalDns,
                        Domain: _target[i].Domain,
                        FinshCname: _target[i].FinshCname,
                        IPs: _target[i].IPs ? _target[i].IPs : '空',
                        CnameList: _target[i].CnameList ? _target[i].CnameList : '空',
                        LocalErr: _target[i].LocalErr ? _target[i].LocalErr : '空',
                        NsName: _target[i].NsName ? _target[i].NsName : '空',
                        NsIp: _target[i].NsIp ? _target[i].NsIp : '空',
                        NsRecord: _target[i].NsRecord ? _target[i].NsRecord : '空',
                        NsErr: _target[i].NsErr ? _target[i].NsErr : '空'
                    });
                }
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    const tHeader = ['时间', 'LocalDns', '域名', 'CName', 'IPs', 'CnameList', 'LocalErr', 'NsName', 'NsIp', 'NsRecord', 'NsErr'];
                    const filterVal = ['Time', 'LocalDns', 'Domain', 'FinshCname', 'IPs', 'CnameList', 'LocalErr', 'NsName', 'NsIp', 'NsRecord', 'NsErr'];
                    const data = _that.formatJson(filterVal, _arr);
                    export_json_to_excel(tHeader, data, '数据导出表格');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>

<style lang="scss">
    .domain-query {
        padding: 30px;
        .error-style,
        .el-table--striped .el-table__body tr.el-table__row--striped.error-style td{
            background-color: #f9a288;
        }
        p {
            padding: 0;
            margin: 0;
        }
        .data-tooltip {
            width: 100%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-pagination {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #e8e5e5;
            margin-top: 30px;
        }
        .ibagese, .ipsgase {
            text-align: center;
            cursor: pointer;
        }
    }
    .domain-query .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
    .domain {
        & > .el-input {
            width: 50%;
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
    .el-date-editor--datetimerange.el-input {
        width: 320px !important;
    }
</style>