<template>
    <div class="domain-show">
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
                prop="Time"
                sortable
                label="时间">
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
                <!--<template scope="scope">-->
                    <!--<div v-for="(item, index) in scope.row.LocalDnsAddr">-->
                        <!--<p  v-if='isShow'>{{ index < 2 ? item : ''}}</p>-->
                        <!--<p  v-else>{{ item }}</p>-->
                    <!--</div>-->
                    <!--<p class="ibagese" @click='ipsToggles' v-if='scope.row.LocalDnsAddr.length>2'><i class="fa" :class='[isShow ? faChevronDown : faChevronUp]'></i></p>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                prop="Ips"
                sortable
                label="IPS">
                <!--<template scope="scope">-->
                    <!--<div v-for='(item, index) in scope.row.Ips'>-->
                        <!--<p  v-if='ipsShow'>{{ index < 2 ? item : ''}}</p>-->
                        <!--<p  v-else>{{ item }}</p>-->
                    <!--</div>-->
                    <!--<p class="ipsgase" @click='ipstoToggles' v-if='scope.row.Ips.length>2'><i class="fa" :class='[ipsShow ? ips_faChevronDown : ips_faChevronUp]'></i></p>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                prop="FinishCname"
                sortable
                label="CNAME">
            </el-table-column>
            <el-table-column
                prop="CnameList"
                sortable
                label="CNAME_LIST">
            </el-table-column>
            <el-table-column
                prop="Status"
                sortable
                label="Status"
                :filters="[{ text: '正常', value: 0 }, { text: '异常', value: 1 }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template scope="scope">
                    <el-tag
                        :type="scope.row.Status === 0 ? 'success' : 'danger'"
                        close-transition>{{ scope.row.Status === 0 ? '正常' : '异常' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="Err"
                sortable
                label="Error">
            </el-table-column>
        </data-tables>
    </div>
</template>

<script>

    import enLang from 'element-ui/lib/locale/lang/en'
    import zhLang from 'element-ui/lib/locale/lang/zh-CN'
    import locale from 'element-ui/lib/locale'

    export default {
        data() {
            return {
                lang: '',
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
                }
            }
        },
        props: [],
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
                    pageSize: 20,
                    pageSizes: [20, 50, 100, 500],
                    currentPage: 1
                }
            },
            filterTag(value, row) {
                return row.Status === value;
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
                //let _newDate = _that.getNowDate();
                _that.$http.post('http://172.16.12.7:8080/display').then(response => {
                    _that.tableData = response.body;
                    console.log(_that.tableData);
                }).catch(error => {
                    _that.$message.error(error.bodyText);
                    _that.tableData = [];
                });
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
    }
    .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
</style>