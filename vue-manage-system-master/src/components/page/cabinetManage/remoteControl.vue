<template>
    <div class="remoteControl">
        <div class="container">
            <!-- 搜索栏 -->
            <div class="search-bar">
                <el-input
                    v-model="searchBoxId"
                    placeholder="请输入柜编号"
                    class="search-input"
                    clearable
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="warning" icon="el-icon-refresh" @click="handleRefresh">刷新状态</el-button>
            </div>

            <!-- 柜体列表 -->
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="isLoading"
                border
            >
                <el-table-column prop="boxid" label="柜编号" width="120"></el-table-column>
                <el-table-column prop="boxnum" label="箱编号" width="120"></el-table-column>
                <el-table-column prop="boxtype" label="箱类型" width="100"></el-table-column>
                <el-table-column prop="address" label="地理位置"></el-table-column>
                <el-table-column prop="isopen" label="开关状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isopen === '开' ? 'success' : 'info'">
                            {{ scope.row.isopen }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="isempty" label="空/满" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isempty === '空' ? 'warning' : 'danger'">
                            {{ scope.row.isempty }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="iserror" label="故障状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.iserror === '否' ? 'success' : 'danger'">
                            {{ scope.row.iserror === '否' ? '正常' : '故障' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="temperature" label="温度" width="80"></el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            :disabled="scope.row.isopen === '开'"
                            @click="handleOpenDoor(scope.row)"
                        >开门</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            :disabled="scope.row.isopen === '关'"
                            @click="handleCloseDoor(scope.row)"
                        >关门</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleReset(scope.row)"
                        >重启</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                style="padding-top:20px;float:right;"
                :current-page="page"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!-- 操作确认弹窗 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="400px"
        >
            <p>{{ dialogMessage }}</p>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :loading="actionLoading" @click="confirmAction">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            isLoading: false,
            searchBoxId: '',
            dialogVisible: false,
            dialogTitle: '',
            dialogMessage: '',
            actionLoading: false,
            currentAction: null,
            currentRow: null,
            tableData: [
                { boxid: 'CAB001', boxnum: 'B001', boxtype: '标准箱', address: '广东省深圳市南山区科技园', isopen: '关', isempty: '空', iserror: '否', temperature: '25°C' },
                { boxid: 'CAB001', boxnum: 'B002', boxtype: '大型箱', address: '广东省深圳市南山区科技园', isopen: '开', isempty: '满', iserror: '否', temperature: '24°C' },
                { boxid: 'CAB001', boxnum: 'B003', boxtype: '冷藏箱', address: '广东省深圳市南山区科技园', isopen: '关', isempty: '满', iserror: '是', temperature: '8°C' },
                { boxid: 'CAB002', boxnum: 'B001', boxtype: '标准箱', address: '广东省深圳市福田区市民中心', isopen: '关', isempty: '空', iserror: '否', temperature: '26°C' },
                { boxid: 'CAB002', boxnum: 'B002', boxtype: '标准箱', address: '广东省深圳市福田区市民中心', isopen: '关', isempty: '空', iserror: '否', temperature: '26°C' },
                { boxid: 'CAB003', boxnum: 'B001', boxtype: '超大箱', address: '广东省广州市天河区体育西路', isopen: '关', isempty: '满', iserror: '否', temperature: '27°C' },
            ]
        };
    },
    created() {
        this.total = this.tableData.length;
    },
    methods: {
        handleSearch() {
            this.isLoading = true;
            setTimeout(() => {
                if (this.searchBoxId) {
                    this.tableData = this.tableData.filter(item =>
                        item.boxid.includes(this.searchBoxId)
                    );
                }
                this.isLoading = false;
            }, 500);
        },
        handleRefresh() {
            this.isLoading = true;
            this.$message.info('正在刷新柜体状态...');
            setTimeout(() => {
                this.isLoading = false;
                this.$message.success('状态刷新成功');
            }, 1000);
        },
        handleOpenDoor(row) {
            this.currentRow = row;
            this.currentAction = 'open';
            this.dialogTitle = '远程开门';
            this.dialogMessage = `确认对柜 ${row.boxid} 的箱 ${row.boxnum} 执行远程开门操作？`;
            this.dialogVisible = true;
        },
        handleCloseDoor(row) {
            this.currentRow = row;
            this.currentAction = 'close';
            this.dialogTitle = '远程关门';
            this.dialogMessage = `确认对柜 ${row.boxid} 的箱 ${row.boxnum} 执行远程关门操作？`;
            this.dialogVisible = true;
        },
        handleReset(row) {
            this.currentRow = row;
            this.currentAction = 'reset';
            this.dialogTitle = '远程重启';
            this.dialogMessage = `确认对柜 ${row.boxid} 的箱 ${row.boxnum} 执行远程重启操作？重启期间该箱将暂时不可用。`;
            this.dialogVisible = true;
        },
        confirmAction() {
            this.actionLoading = true;
            setTimeout(() => {
                if (this.currentAction === 'open') {
                    this.currentRow.isopen = '开';
                    this.$message.success(`柜 ${this.currentRow.boxid} 箱 ${this.currentRow.boxnum} 开门成功`);
                } else if (this.currentAction === 'close') {
                    this.currentRow.isopen = '关';
                    this.$message.success(`柜 ${this.currentRow.boxid} 箱 ${this.currentRow.boxnum} 关门成功`);
                } else if (this.currentAction === 'reset') {
                    this.$message.success(`柜 ${this.currentRow.boxid} 箱 ${this.currentRow.boxnum} 重启指令已发送`);
                }
                this.actionLoading = false;
                this.dialogVisible = false;
            }, 1500);
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.page = val;
        }
    }
};
</script>

<style scoped>
.container {
    overflow: hidden;
    padding: 10px;
}
.search-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.search-input {
    width: 220px;
}
</style>
