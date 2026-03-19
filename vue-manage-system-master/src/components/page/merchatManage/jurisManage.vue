<template>
    <div class="jurisManage">
        <div class="container">
            <!-- 搜索与操作栏 -->
            <div class="toolbar">
                <el-input
                    v-model="searchName"
                    placeholder="请输入商户名或登录名"
                    class="search-input"
                    clearable
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="success" icon="el-icon-plus" @click="handleAdd">新增权限</el-button>
            </div>

            <el-table :data="tableData" style="width: 100%" border v-loading="isLoading">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="login_name" label="登录名" width="120"></el-table-column>
                <el-table-column prop="merchant_name" label="商户名" width="120"></el-table-column>
                <el-table-column prop="role" label="角色" width="120">
                    <template slot-scope="scope">
                        <el-tag :type="roleTagType(scope.row.role)">{{ scope.row.role }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="permissions" label="权限范围">
                    <template slot-scope="scope">
                        <el-tag
                            v-for="(perm, idx) in scope.row.permissions"
                            :key="idx"
                            size="mini"
                            style="margin-right:4px;"
                        >{{ perm }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="handleStatusChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

        <!-- 新增/编辑对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="520px" @close="resetForm">
            <el-form :model="form" :rules="rules" ref="permForm" label-width="90px">
                <el-form-item label="登录名" prop="login_name">
                    <el-input v-model="form.login_name" placeholder="请输入登录名"></el-input>
                </el-form-item>
                <el-form-item label="商户名" prop="merchant_name">
                    <el-input v-model="form.merchant_name" placeholder="请输入商户名"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="form.role" placeholder="请选择角色" style="width:100%">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="只读用户" value="只读用户"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限范围" prop="permissions">
                    <el-checkbox-group v-model="form.permissions">
                        <el-checkbox label="柜体管理">柜体管理</el-checkbox>
                        <el-checkbox label="商户管理">商户管理</el-checkbox>
                        <el-checkbox label="数据查看">数据查看</el-checkbox>
                        <el-checkbox label="系统管理">系统管理</el-checkbox>
                        <el-checkbox label="远程操控">远程操控</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status" active-text="启用" inactive-text="禁用"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
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
            searchName: '',
            dialogVisible: false,
            dialogTitle: '新增权限',
            isEdit: false,
            form: {
                login_name: '',
                merchant_name: '',
                role: '',
                permissions: [],
                status: true
            },
            rules: {
                login_name: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
                merchant_name: [{ required: true, message: '请输入商户名', trigger: 'blur' }],
                role: [{ required: true, message: '请选择角色', trigger: 'change' }]
            },
            tableData: [
                { id: 1, login_name: 'admin', merchant_name: '系统管理员', role: '超级管理员', permissions: ['柜体管理', '商户管理', '数据查看', '系统管理', '远程操控'], status: true, create_time: '2019-11-01 10:00:00' },
                { id: 2, login_name: 'merchant01', merchant_name: '幸福快递', role: '管理员', permissions: ['柜体管理', '商户管理', '数据查看'], status: true, create_time: '2019-11-15 14:30:00' },
                { id: 3, login_name: 'operator01', merchant_name: '顺丰速运', role: '普通用户', permissions: ['数据查看', '远程操控'], status: true, create_time: '2019-12-01 09:00:00' },
                { id: 4, login_name: 'viewer01', merchant_name: '菜鸟驿站', role: '只读用户', permissions: ['数据查看'], status: false, create_time: '2020-01-03 16:00:00' }
            ]
        };
    },
    created() {
        this.total = this.tableData.length;
    },
    methods: {
        roleTagType(role) {
            const map = { '超级管理员': 'danger', '管理员': 'warning', '普通用户': 'primary', '只读用户': 'info' };
            return map[role] || 'info';
        },
        handleSearch() {
            this.isLoading = true;
            setTimeout(() => { this.isLoading = false; }, 500);
        },
        handleAdd() {
            this.isEdit = false;
            this.dialogTitle = '新增权限';
            this.form = { login_name: '', merchant_name: '', role: '', permissions: [], status: true };
            this.dialogVisible = true;
        },
        handleEdit(row) {
            this.isEdit = true;
            this.dialogTitle = '编辑权限';
            this.form = { ...row, permissions: [...row.permissions] };
            this.dialogVisible = true;
        },
        handleDelete(row) {
            this.$confirm(`确认删除用户 ${row.login_name} 的权限？`, '提示', { type: 'warning' }).then(() => {
                this.tableData = this.tableData.filter(item => item.id !== row.id);
                this.total = this.tableData.length;
                this.$message.success('删除成功');
            }).catch(() => {});
        },
        handleStatusChange(row) {
            this.$message.success(`用户 ${row.login_name} 状态已${row.status ? '启用' : '禁用'}`);
        },
        submitForm() {
            this.$refs.permForm.validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        const idx = this.tableData.findIndex(item => item.id === this.form.id);
                        if (idx !== -1) this.$set(this.tableData, idx, { ...this.form });
                        this.$message.success('编辑成功');
                    } else {
                        const newItem = { ...this.form, id: this.tableData.length + 1, create_time: new Date().toLocaleString() };
                        this.tableData.push(newItem);
                        this.total = this.tableData.length;
                        this.$message.success('新增成功');
                    }
                    this.dialogVisible = false;
                }
            });
        },
        resetForm() {
            this.$refs.permForm && this.$refs.permForm.resetFields();
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
}
.search-input {
    width: 220px;
}
</style>
