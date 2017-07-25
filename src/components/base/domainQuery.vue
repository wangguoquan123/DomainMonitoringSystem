<template>
    <div class="domain-query">
        <div class="query-tool">
            <div class="date" style="display: inline-block;">
                <el-radio class="radio" v-model="radio" label="1">按日期</el-radio>
                <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    placeholder="请选择日期范围">
                </el-date-picker>
            </div>
            <div class="domain" style="display: inline-block; width: 400px; margin-left: 25px;">
                <el-radio class="radio" v-model="radio" label="2">按域名</el-radio>
                <el-input v-model="domainInput" placeholder="请输入域名"></el-input>
                <el-button type="primary">域名查询</el-button>
            </div>
        </div>
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
                radio: 1,
                domainInput: '',
                tableData: [],
                searchObj: {
                    placeholder: '请输入搜索关键字',
                    offset:20,
                    width:4
                },
                dateValue: ''
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
            this.getData();
        },
        updated() {
            let _date_input = document.getElementsByClassName('query-tool')[0].getElementsByTagName('input')[0];
            let _search_input = document.getElementsByClassName('tool-bar')[0].getElementsByTagName('input')[0];
            _date_input.setAttribute('placeholder', '请选择日期范围');
            _search_input.setAttribute('placeholder', '请输入要搜索的关键字');
        },
        methods: {
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
    .domain-query {
        padding: 30px;
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
</style>