<template>
    <div class="infoManage">
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
            prop="type"
            label="分组分类">
            </el-table-column>
            <el-table-column
            prop="specs"
            label="规格">
            </el-table-column>
            <el-table-column
            prop="size"
            label="箱体数量">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地理位置">
            </el-table-column>
            <el-table-column
            prop="longitude"
            label="经度">
            </el-table-column>
            <el-table-column
            prop="latitude"
            label="纬度">
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
                    type: 'iioio',
                    specs: '规格',
                    size: '50',
                    address: '广东省深圳市',
                    longitude: '22.14',
                    latitude: '114.118'
                },
                {
                    id:15,
                    boxid: '122',
                    type: 'iioio',
                    specs: '规格',
                    size: '50',
                    address: '广东省深圳市',
                    longitude: '22.14',
                    latitude: '114.118'
                },
                {
                    id:15,
                    boxid: '122',
                    type: 'iioio',
                    specs: '规格',
                    size: '50',
                    address: '广东省深圳市',
                    longitude: '22.14',
                    latitude: '114.118'
                },
            ]
        }
    },
    created () {
        
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        
    }
}
</script>
<style scoped>
.container{
    overflow: hidden;
}
</style>