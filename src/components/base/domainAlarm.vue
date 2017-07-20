<template>
    <div class="domain-alarm">
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
            <el-table-column
                sortable
                label="状态">
                <template scope="scope">
                    <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
                </template>
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
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        status: 'success'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        status: 'success'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        status: 'warning'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        status: 'success'
                    },
                    {
                        date: '2016-05-05',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1521 弄',
                        status: 'danger'
                    },
                    {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 153 弄',
                        status: 'success'
                    },
                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1545 弄',
                        status: 'warning'
                    },
                    {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1588 弄',
                        status: 'warning'
                    },
                    {
                        date: '2016-05-09',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1562 弄',
                        status: 'danger'
                    },
                    {
                        date: '2016-05-10',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 15245 弄',
                        status: 'warning'
                    },
                    {
                        date: '2016-05-11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 15666 弄',
                        status: 'success'
                    },
                    {
                        date: '2016-05-12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 158888 弄',
                        status: 'success'
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
            tableRowClassName(row, index) {
                console.log(index);
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
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
    }
    .tool-bar {
        text-align: right;
        & > .search {
            float: none;
            display: inline-block;
        }
    }
</style>