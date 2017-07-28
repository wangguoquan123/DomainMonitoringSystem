<template>
    <div class="domain-show" v-loading="domainLoading">
        <div class="show-tool-bar" style="padding-bottom: 30px; overflow: hidden;">
            <div class="left" style="width: 50%; float: left; text-align: left;">
                <span>筛选：</span>
                <el-checkbox v-model="filterAbnormal" @change="filterEvent" :disabled="abnormalStatus">异常</el-checkbox>
            </div>
            <div class="right" style="width: 50%; float: left; text-align: right;">
                <el-input v-model="searchInput" placeholder="请输入搜索关键字" @change="filterInput" :disabled="inputStatus"></el-input>
            </div>
        </div>
        <el-table
            :data="dataGroup()"
            :row-class-name="tableRowClassName"
            :style="{ 'height': tableHeight }"
            :height="tableHeight"
            :default-sort = "{prop: 'Time', order: 'descending'}"
            @current-change="handleCurrentChange"
            stripe
            border
            highlight-current-row
            style="width: 100%">
            <el-table-column
                prop="Time"
                sortable
                label="时间">
                <template scope="scope">
                    <span>{{ scope.row.Time | convertDate }}</span>
                    <!--<span ref="statussss">{{ getStatus(scope.row.Status) }}</span>-->
                </template>
            </el-table-column>
            <el-table-column
                prop="Domain"
                sortable
                label="域名">
            </el-table-column>
            <el-table-column
                prop="LocalDnsAddr"
                sortable
                label="DNS地址">
            </el-table-column>
            <el-table-column
                prop="Ips"
                sortable
                label="IPS">
                <template scope="scope">
                    <ip-show :ipsLength="jsonConvertArray(scope.row.Ips)" v-if="jsonConvertArray(scope.row.Ips)"></ip-show>
                    <span v-else>空</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="FinishCname"
                sortable
                label="CNAME">
                <template scope="scope">
                    <el-tooltip :content="scope.row.FinishCname" placement="top" effect="light">
                        <span class="finish-cname-tooltip">{{ scope.row.FinishCname }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="CnameList"
                sortable
                label="CNAME_LIST">
                <template scope="scope">
                    <el-tooltip :content="scope.row.CnameList" placement="top" effect="light">
                        <span class="cname-list-tooltip">{{ scope.row.CnameList }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="Status"-->
            <!--sortable-->
            <!--label="Status">-->
            <!--<template scope="scope">-->
            <!--<el-tag-->
            <!--:type="scope.row.Status === 0 ? 'success' : 'danger'"-->
            <!--ref="statusDom"-->
            <!--close-transition>{{ scope.row.Status === 0 ? '正常' : '异常' }}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="Err"
                sortable
                label="Error"
                class="error-message">
                <template scope="scope">
                    <div v-if="scope.row.Err.length">
                        <el-tooltip :content="scope.row.Err" placement="top-end" effect="light">
                            <span class="finish-cname-tooltip">{{ scope.row.Err }}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>空</div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="dialogTitle"
            :visible.sync="authorityDetails"
            size="small"
            class="email-data">
            <div v-loading="authorityLoading" class="main" element-loading-text="拼命加载中">
                <el-col>
                    <el-table
                        :data="detailsData"
                        stripe
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="NsName"
                            sortable
                            label="ServerName">
                        </el-table-column>
                        <el-table-column
                            prop="NsIp"
                            sortable
                            label="ServerIp">
                        </el-table-column>
                        <el-table-column
                            prop="NsRecord"
                            sortable
                            label="Record">
                            <template scope="scope">
                                <ip-show :ipsLength="jsonConvertArray(scope.row.NsRecord)" v-if="jsonConvertArray(scope.row.NsRecord)"></ip-show>
                                <span v-else>空</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Err"
                            sortable
                            label="Error">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col class="button-group" style="margin-top: 20px;">
                    <el-button type="primary" @click="authorityDetails = false;">关闭</el-button>
                </el-col>
            </div>
        </el-dialog>

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
                isShow: true,
                dialogTitle: '',
                tableHeight: '',
                filterAbnormal: '',
                searchInput: '',
                authorityDetails: false,
                authorityLoading: true,
                domainLoading: false,
                abnormalStatus: false,
                inputStatus: false,
                faChevronDown: 'fa-chevron-down',
                faChevronUp: 'fa-chevron-up',
                ipsShow: true,
                ips_faChevronDown: 'fa-chevron-down',
                ips_faChevronUp: 'fa-chevron-up',
                tableData: [],
                filterData: [],
                newData: [],
                detailsData: []
            }
        },
        props: [],
        components: {
            ipShow
        },
        mounted() {
            let _that = this;
            let _csrftoken = window.localStorage.getItem('scrftoken');
            if (!_csrftoken) {
                this.$goRoute('/');
                window.localStorage.setItem('scrftoken', '');
                return false;
            }
            _that.lang = _that.$i18n;
            if (_that.lang.locale === 'en') {
                locale.use(enLang);
            } else if (_that.lang.locale === 'cn') {
                locale.use(zhLang);
            }
            _that.getData();
            setInterval(function() {
                _that.getData();
            }, 60000 * 10);
            let _this = this;
            _this.updateHeight();
            window.addEventListener('resize', () => {_this.updateHeight()});
        },
        computed: {

        },
        methods: {
            ipsToggles() {
                this.isShow = !this.isShow;
            },
            ipstoToggles() {
                this.ipsShow = !this.ipsShow;
            },
            handleSelectionChange(value) {
                //console.log(value);
            },
            handleCurrentChange(row, index){
                let _that = this;
                let _obj = {
                    time: row.Time,
                    domain: row.Domain
                };
                _that.authorityDetails = true;
                _that.authorityLoading = true;
                _that.$http.post('http://172.16.12.7:8080/details', _obj).then(response => {
                    _that.detailsData = response.body;
                    _that.authorityLoading = false;
                    _that.dialogTitle = _obj.domain + '(' + row.FinishCname + ')';
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                });
            },
            filterEvent() {
                let _that = this;
                _that.domainLoading = true;
                let _val = _that.filterAbnormal;
                let _len = _that.tableData.length - 1;
                if (_val) {
                    for (let i = 0, len = _that.tableData.length; i < len; i ++) {
                        if (_that.tableData[i].Status === 1) {
                            _that.filterData.push(_that.tableData[i]);
                        }
                        if (i === _len) {
                            setTimeout(function() {
                                _that.domainLoading = false;
                            }, 2000);
                        }
                    }
                } else {
                    setTimeout(function() {
                        _that.domainLoading = false;
                    }, 2000);
                    _that.filterData = [];
                }
            },
            filterInput(value) {
                let data = '';
                if (this.filterData.length) {
                    data = this.filterData;
                } else {
                    data = this.tableData;
                }
                let filterKey = value && value.toLowerCase();
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
//                if (sortKey) {
//                    data = data.slice().sort(function (a, b) {
//                        a = a[sortKey]
//                        b = b[sortKey]
//                        return (a === b ? 0 : a > b ? 1 : -1) * order
//                    })
//                }
                this.newData = data;
                return data;
            },
            dataGroup() {
                let data = '';
                if (this.searchInput) {
                    data = this.newData;
                } else if (this.filterData.length) {
                    data = this.filterData;
                } else {
                    data = this.tableData;
                }
                return data;
            },
            updateHeight () {
                let sideHeight = document.documentElement.clientHeight || document.body.clientHeight;
                this.tableHeight = (sideHeight - 60) + 'px';
            },
            tableRowClassName(row, index) {
                if (row.Status === 1) {
                    return 'error-style'
                }
                return '';
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
            getNowDate() {
                let _start = parseInt(new Date().getTime() / 1000 / 60) - 10;
                let _end = parseInt(new Date().getTime() / 1000 / 60);
                return {
                    start: _start,
                    end: _end
                }
            },
            getData() {
                let _that = this;
                _that.$http.post('http://172.16.12.7:8080/display').then(response => {
                    console.log(response);
                    _that.tableData = response.body;
                    if (response.body === null) {
                        _that.abnormalStatus = true;
                        _that.inputStatus = true;
                    } else {
                        _that.abnormalStatus = false;
                        _that.inputStatus = false;
                    }
                    _that.$store.commit('loadingActive', false);
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                    _that.abnormalStatus = true;
                    _that.inputStatus = true;
                    _that.tableData = [];
                });
            },
            jsonConvertArray(value) {
                let _arr = JSON.parse(value);
                return _arr;
            },
            convertStamp(date) {
                return date;
            }
        }
    }
</script>

<style lang="scss">
    .domain-show {
        padding: 30px;
        p {
            margin: 0;
            padding: 0;
        }
        .ibagese, .ipsgase {
            text-align: center;
            cursor: pointer;
        }
        .finish-cname-tooltip,
        .cname-list-tooltip {
            width: 100%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-table {
            overflow: auto;
            tr {
                cursor: pointer;
            }
        }
        .sc-checkbox-group {
            text-align: left;
        }
        .main {
            overflow: hidden;
            .button-group {
                text-align: right;
            }
        }
        .error-style,
        .el-table--striped .el-table__body tr.el-table__row--striped.error-style td{
            background-color: #f9a288;
        }
        .right {
            text-align: right;
            .el-input {
                width: 250px;
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