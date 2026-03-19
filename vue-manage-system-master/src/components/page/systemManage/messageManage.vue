<template>
    <div class="messageManage">
        <div class="container">
            <!-- 操作栏 -->
            <div class="toolbar">
                <el-input
                    v-model="searchText"
                    placeholder="搜索消息标题或内容"
                    class="search-input"
                    clearable
                ></el-input>
                <el-select v-model="filterType" placeholder="消息类型" clearable style="width:130px">
                    <el-option label="系统通知" value="系统通知"></el-option>
                    <el-option label="故障告警" value="故障告警"></el-option>
                    <el-option label="业务提醒" value="业务提醒"></el-option>
                </el-select>
                <el-select v-model="filterStatus" placeholder="状态" clearable style="width:110px">
                    <el-option label="未读" value="未读"></el-option>
                    <el-option label="已读" value="已读"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="success" icon="el-icon-plus" @click="handleAdd">发送消息</el-button>
                <el-button type="warning" @click="markAllRead">全部标为已读</el-button>
            </div>

            <el-table
                :data="tableData"
                style="width: 100%"
                border
                v-loading="isLoading"
                @row-click="handleRowClick"
            >
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="type" label="类型" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="msgTypeTag(scope.row.type)" size="mini">{{ scope.row.type }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" width="200">
                    <template slot-scope="scope">
                        <span :class="{ 'unread-title': scope.row.status === '未读' }">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sender" label="发送人" width="100"></el-table-column>
                <el-table-column prop="receiver" label="接收人" width="100"></el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-badge is-dot :hidden="scope.row.status === '已读'">
                            <el-tag :type="scope.row.status === '未读' ? 'danger' : 'info'" size="mini">{{ scope.row.status }}</el-tag>
                        </el-badge>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="发送时间" width="160"></el-table-column>
                <el-table-column label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click.stop="handleView(scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click.stop="handleDelete(scope.row)">删除</el-button>
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

        <!-- 消息详情弹窗 -->
        <el-dialog title="消息详情" :visible.sync="viewVisible" width="520px">
            <div v-if="currentMsg">
                <p><strong>类型：</strong><el-tag :type="msgTypeTag(currentMsg.type)" size="mini">{{ currentMsg.type }}</el-tag></p>
                <p><strong>标题：</strong>{{ currentMsg.title }}</p>
                <p><strong>内容：</strong>{{ currentMsg.content }}</p>
                <p><strong>发送人：</strong>{{ currentMsg.sender }}</p>
                <p><strong>接收人：</strong>{{ currentMsg.receiver }}</p>
                <p><strong>发送时间：</strong>{{ currentMsg.create_time }}</p>
            </div>
            <span slot="footer"><el-button type="primary" @click="viewVisible = false">关闭</el-button></span>
        </el-dialog>

        <!-- 发送消息弹窗 -->
        <el-dialog title="发送消息" :visible.sync="sendVisible" width="520px" @close="resetSendForm">
            <el-form :model="sendForm" :rules="sendRules" ref="sendForm" label-width="80px">
                <el-form-item label="消息类型" prop="type">
                    <el-select v-model="sendForm.type" placeholder="请选择" style="width:100%">
                        <el-option label="系统通知" value="系统通知"></el-option>
                        <el-option label="故障告警" value="故障告警"></el-option>
                        <el-option label="业务提醒" value="业务提醒"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="sendForm.title" placeholder="请输入消息标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" :rows="4" v-model="sendForm.content" placeholder="请输入消息内容"></el-input>
                </el-form-item>
                <el-form-item label="接收人" prop="receiver">
                    <el-input v-model="sendForm.receiver" placeholder="请输入接收人"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="sendVisible = false">取消</el-button>
                <el-button type="primary" @click="submitSend">发送</el-button>
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
            searchText: '',
            filterType: '',
            filterStatus: '',
            viewVisible: false,
            sendVisible: false,
            currentMsg: null,
            sendForm: { type: '', title: '', content: '', receiver: '' },
            sendRules: {
                type: [{ required: true, message: '请选择消息类型', trigger: 'change' }],
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                receiver: [{ required: true, message: '请输入接收人', trigger: 'blur' }]
            },
            tableData: [
                { id: 1, type: '故障告警', title: '柜体CAB003故障告警', content: 'CAB003冷藏箱温度异常，当前温度超过设定阈值，请及时处理。', sender: '系统', receiver: '管理员', status: '未读', create_time: '2020-03-19 08:30:00' },
                { id: 2, type: '业务提醒', title: '有包裹超时未取', content: 'CAB001柜B002箱包裹存放已超过72小时，请通知取件人及时取件。', sender: '系统', receiver: 'merchant01', status: '未读', create_time: '2020-03-19 09:15:00' },
                { id: 3, type: '系统通知', title: '系统升级通知', content: '系统将于今晚23:00-24:00进行升级维护，期间服务暂停，请提前做好准备。', sender: 'admin', receiver: '全体用户', status: '已读', create_time: '2020-03-18 16:00:00' },
                { id: 4, type: '业务提醒', title: 'CAB002占用率过高', content: 'CAB002柜体占用率已达90%，请及时处理或调配资源。', sender: '系统', receiver: '管理员', status: '已读', create_time: '2020-03-18 10:00:00' },
                { id: 5, type: '系统通知', title: '新版本发布通知', content: '快递柜管理系统v2.1.0正式发布，新增远程重启功能，欢迎体验。', sender: 'admin', receiver: '全体用户', status: '已读', create_time: '2020-03-17 14:00:00' }
            ]
        };
    },
    created() {
        this.total = this.tableData.length;
    },
    methods: {
        msgTypeTag(type) {
            const map = { '故障告警': 'danger', '业务提醒': 'warning', '系统通知': 'primary' };
            return map[type] || 'info';
        },
        handleSearch() {
            this.isLoading = true;
            setTimeout(() => { this.isLoading = false; }, 500);
        },
        handleAdd() {
            this.sendForm = { type: '', title: '', content: '', receiver: '' };
            this.sendVisible = true;
        },
        markAllRead() {
            this.tableData.forEach(item => { item.status = '已读'; });
            this.$message.success('已全部标为已读');
        },
        handleRowClick(row) {
            this.handleView(row);
        },
        handleView(row) {
            row.status = '已读';
            this.currentMsg = row;
            this.viewVisible = true;
        },
        handleDelete(row) {
            this.$confirm('确认删除该消息？', '提示', { type: 'warning' }).then(() => {
                this.tableData = this.tableData.filter(item => item.id !== row.id);
                this.total = this.tableData.length;
                this.$message.success('删除成功');
            }).catch(() => {});
        },
        submitSend() {
            this.$refs.sendForm.validate(valid => {
                if (valid) {
                    const newMsg = {
                        id: this.tableData.length + 1,
                        ...this.sendForm,
                        sender: 'admin',
                        status: '未读',
                        create_time: new Date().toLocaleString()
                    };
                    this.tableData.unshift(newMsg);
                    this.total = this.tableData.length;
                    this.$message.success('消息发送成功');
                    this.sendVisible = false;
                }
            });
        },
        resetSendForm() {
            this.$refs.sendForm && this.$refs.sendForm.resetFields();
        },
        handleSizeChange(val) { this.pageSize = val; },
        handleCurrentChange(val) { this.page = val; }
    }
};
</script>

<style scoped>
.container {
    overflow: hidden;
    padding: 10px;
}
.toolbar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.search-input {
    width: 200px;
}
.unread-title {
    font-weight: bold;
    color: #303133;
}
</style>
