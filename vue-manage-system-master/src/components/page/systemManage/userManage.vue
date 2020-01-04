<template>
    <div class="userManage">
        <div class="container">
            <el-table
            :data="tableData"
            
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID">
            </el-table-column>
            <el-table-column
            prop="login_name"
            label="登录名" >
            </el-table-column>
            <el-table-column
            prop="pwd"
            label="密码">
            </el-table-column>
            <el-table-column
            prop="user_rule"
            label="权限">
            </el-table-column>
            <el-table-column
            prop="type"
            label="角色分类">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话">
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户名">
            </el-table-column>
            <!-- <el-table-column
            prop="loginTime"
            label="登录时间">
            </el-table-column> -->
        	</el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            style="padding-top:20px;float:right;"
            :current-page="page"
            :page-sizes="[1, 10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            v-loading="isLoading"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            page: 1,
            pageSize:10,
            total: 0,
            isLoading: false,
            tableData: []
        }
    },
    created () {
        this.getTableList()
        this.getPhone()
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val
            this.getTableList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getTableList()
        },
        // 获取列表数据
        getTableList () {
            let param = {
               pageIndex: this.page,
               pageSize: this.pageSize
            }
            this.isLoading = true
            this.$http.post('/Api/user_table.aspx?action=list', this.qs.stringify(param)).then((res) => {
                if (res.data.error == 1 ) {
                    this.tableData = res.data.data.list
                    this.total = res.data.data.count
                    console.log(this.total)
                } else {
                    this.$message.error(res.message)
                }
                this.isLoading = false
            })

        },
        getPhone () {
            let param = {
               phone: '13267161393'
            }
            this.$http.post('/Api/user_table.aspx?action=sendsms', this.qs.stringify(param)).then((res) => {
               
            })
        }
    }
}
</script>
<style scoped>
.container{
    overflow: hidden;
}
</style>

