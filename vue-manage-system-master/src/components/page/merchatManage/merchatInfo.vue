<template>
    <div class="merchatInfo">
        <div class="container">
            <el-table
            :data="tableData"
            
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID">
            </el-table-column>
            <el-table-column
            prop="merchant_name"
            label="商户名" >
            </el-table-column>
            <el-table-column
            prop="type"
            label="分组分类">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话">
            </el-table-column>
            <el-table-column
            prop="isdistribution"
            label="是否分配">
            </el-table-column>
            <el-table-column
            prop="islist"
            label="是否白名单">
            </el-table-column>
        	</el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            style="padding-top:20px;float:right;"
            :current-page="page"
            :page-sizes="[10, 20, 50, 400]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            page: 1,
            tableData: [
                {
                    id:15,
                    merchant_name: '幸福的人',
                    islist: '是',
                    type: '超级管理员',
                    phone: '13267161395',
                    isdistribution: '2019-11-25'
                },
                {
                    id:15,
                    merchant_name: '幸福的人',
                    islist: '是',
                    type: '超级管理员',
                    phone: '13267161395',
                    isdistribution: '2019-11-25'
                },
                {
                    id:15,
                    merchant_name: '幸福的人',
                    islist: '是',
                    type: '超级管理员',
                    phone: '13267161395',
                    isdistribution: '2019-11-25'
                },
            ]
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style scoped>
.container{
    overflow: hidden;
}
</style>