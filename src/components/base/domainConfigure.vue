<template>
    <div class="domain-configure">
        <div class="configure-tool">
            <el-button type="primary" @click="ShowModel">{{ $t('Import configuration') }}</el-button>
        </div>
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
                value: ''
            }
        },
        props: [],
        methods: {
            ShowModel() {
                this.dialogTableVisible = true;
            },
            hideModel() {
                this.dialogTableVisible = false;
            },
            submitConfig() {
                let _that = this;
                let _off = true;
                let _newValue = this.value.split('\n');
                _newValue.forEach(function(value, index, array) {
                    if (value !== '' && _that.toTrim(value)) {
                        _off = true;
                    } else {
                        _off = false;
                    }
                });
                if (_off) {
                    alert('可以提交');
                } else {
                    alert('不可以');
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