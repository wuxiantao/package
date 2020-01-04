<template>
    <div class="condMonit">
        <div class="container">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID">
            </el-table-column>
            <el-table-column
            prop="boxid"
            label="柜编号" >
            </el-table-column>
            <el-table-column
            prop="boxnum"
            label="箱编号">
            </el-table-column>
            <el-table-column
            prop="boxtype"
            label="箱类型">
            </el-table-column>
            <el-table-column
            prop="isempty"
            label="空/满">
            </el-table-column>
            <el-table-column
            prop="isopen"
            label="开/关">
            </el-table-column>
            <el-table-column
            prop="temperature"
            label="温度">
            </el-table-column>
            <el-table-column
            prop="iserror"
            label="是否故障">
            </el-table-column>
            <el-table-column
            prop="oddnum"
            label="关联运单号">
            </el-table-column>
            <el-table-column
            prop="s_pwd"
            label="随机密码">
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
                    boxid: '122',
                    boxnum: '33221214',
                    boxtype: '超大箱',
                    isempty: '空',
                    isopen: '开',
                    temperature: '37度',
                    iserror: '否',
                    oddnum: '32513132132123123',
                    s_pwd: '********'
                },
                {
                    id:15,
                    boxid: '122',
                    boxnum: '33221214',
                    boxtype: '超大箱',
                    isempty: '空',
                    isopen: '开',
                    temperature: '37度',
                    iserror: '否',
                    oddnum: '32513132132123123',
                    s_pwd: '********'
                },
                {
                    id:15,
                    boxid: '122',
                    boxnum: '33221214',
                    boxtype: '超大箱',
                    isempty: '空',
                    isopen: '开',
                    temperature: '37度',
                    iserror: '否',
                    oddnum: '32513132132123123',
                    s_pwd: '********'
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