<template>
    <div class="domain-configure">
        <div class="configure-tool">
            <el-button type="primary" @click="ShowModel">{{ $t('Import configuration') }}</el-button>
        </div>
        <el-table
            stripe
            border
            highlight-current-row
            :data="tableData"
            style="width: 100%"
            @current-change="handleCurrentChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="180"
                sortable>
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
                sortable>
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
        <el-dialog :title="$t('Import configuration')" :visible.sync="dialogTableVisible" size="tiny">
            <p>
                <i class="fa fa-exclamation-circle"></i>
                格式: 每行输入一个域名, 然后回车换行.
            </p>
            <textarea v-model="value"></textarea>
            <div style="text-align: right; margin-top: 15px;">
                <el-button @click="hideModel">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="submitConfig">{{ $t('Import') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dialogTableVisible: false,
                value: '',
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
                    }
                ],
                currentPage: 1,
                pageSize: 0,
                pageTotal: 0
            }
        },
        props: [],
        mounted() {
            this.pageTotal = this.tableData.length;
        },
        methods: {
            ShowModel() {
                this.dialogTableVisible = true;
            },
            hideModel() {
                this.dialogTableVisible = false;
            },
            handleCurrentChange(currentRow, oldCurrentRow) {

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            submitConfig() {
                let _that = this;
                let _off = true;
                let _newValue = this.value.split('\n');
                for (let i = 0, len = _newValue.length; i < len; i ++) {
                    if (_newValue[i] !== '' && !_that.toTrim(_newValue[i])) {
                        _off = true;
                    } else {
                        _off = false;
                        alert('不可以');
                        return false;
                    }
                }
                if (_off) {
                    alert('可以提交');
                }
            },
            toTrim(str) {
                let reg = /(^\s+)|(\s+$)/g;
                return reg.test(str);
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
</style>