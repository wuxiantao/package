<template>
    <div class="statisticsData">
        <div class="container">
            <!-- 筛选条件 -->
            <div class="filter-bar">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    style="width:260px"
                ></el-date-picker>
                <el-select v-model="selectedBox" placeholder="选择柜编号" clearable style="width:140px">
                    <el-option v-for="box in boxOptions" :key="box" :label="box" :value="box"></el-option>
                </el-select>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>

            <!-- 统计卡片 -->
            <el-row :gutter="20" class="stat-cards">
                <el-col :span="6">
                    <el-card shadow="hover" class="stat-card stat-card-1">
                        <div class="stat-content">
                            <div class="stat-num">{{ stats.totalOrders }}</div>
                            <div class="stat-label">总订单量</div>
                        </div>
                        <i class="el-icon-document stat-icon"></i>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" class="stat-card stat-card-2">
                        <div class="stat-content">
                            <div class="stat-num">{{ stats.todayOrders }}</div>
                            <div class="stat-label">今日订单</div>
                        </div>
                        <i class="el-icon-date stat-icon"></i>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" class="stat-card stat-card-3">
                        <div class="stat-content">
                            <div class="stat-num">{{ stats.occupancyRate }}%</div>
                            <div class="stat-label">柜体占用率</div>
                        </div>
                        <i class="el-icon-pie-chart stat-icon"></i>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" class="stat-card stat-card-4">
                        <div class="stat-content">
                            <div class="stat-num">{{ stats.errorCount }}</div>
                            <div class="stat-label">故障数量</div>
                        </div>
                        <i class="el-icon-warning stat-icon"></i>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 折线图（模拟） -->
            <el-row :gutter="20" class="chart-row">
                <el-col :span="16">
                    <el-card shadow="hover">
                        <div slot="header">近7天订单量趋势</div>
                        <div class="chart-placeholder">
                            <div class="bar-chart">
                                <div
                                    v-for="(item, idx) in chartData"
                                    :key="idx"
                                    class="bar-item"
                                >
                                    <div class="bar" :style="{ height: item.value / maxChartValue * 140 + 'px' }"></div>
                                    <div class="bar-label">{{ item.date }}</div>
                                    <div class="bar-value">{{ item.value }}</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div slot="header">柜体类型分布</div>
                        <div class="pie-placeholder">
                            <div v-for="(item, idx) in pieData" :key="idx" class="pie-item">
                                <span class="pie-dot" :style="{ background: item.color }"></span>
                                <span class="pie-name">{{ item.name }}</span>
                                <span class="pie-val">{{ item.value }}%</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 明细表格 -->
            <el-card shadow="hover" class="detail-card">
                <div slot="header">数据明细</div>
                <el-table :data="tableData" style="width:100%" border>
                    <el-table-column prop="date" label="日期" width="120"></el-table-column>
                    <el-table-column prop="boxid" label="柜编号" width="100"></el-table-column>
                    <el-table-column prop="orders" label="订单量" width="100"></el-table-column>
                    <el-table-column prop="pickups" label="取件量" width="100"></el-table-column>
                    <el-table-column prop="deposits" label="存件量" width="100"></el-table-column>
                    <el-table-column prop="occupancy" label="占用率">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.occupancy" :color="progressColor(scope.row.occupancy)"></el-progress>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dateRange: [],
            selectedBox: '',
            boxOptions: ['CAB001', 'CAB002', 'CAB003', 'CAB004'],
            stats: {
                totalOrders: 12480,
                todayOrders: 326,
                occupancyRate: 68,
                errorCount: 3
            },
            chartData: [
                { date: '03-13', value: 280 },
                { date: '03-14', value: 310 },
                { date: '03-15', value: 295 },
                { date: '03-16', value: 340 },
                { date: '03-17', value: 380 },
                { date: '03-18', value: 316 },
                { date: '03-19', value: 326 }
            ],
            pieData: [
                { name: '标准箱', value: 45, color: '#409EFF' },
                { name: '大型箱', value: 25, color: '#67C23A' },
                { name: '冷藏箱', value: 15, color: '#E6A23C' },
                { name: '超大箱', value: 15, color: '#F56C6C' }
            ],
            tableData: [
                { date: '2020-03-19', boxid: 'CAB001', orders: 52, pickups: 30, deposits: 22, occupancy: 75 },
                { date: '2020-03-19', boxid: 'CAB002', orders: 48, pickups: 28, deposits: 20, occupancy: 60 },
                { date: '2020-03-19', boxid: 'CAB003', orders: 36, pickups: 20, deposits: 16, occupancy: 50 },
                { date: '2020-03-18', boxid: 'CAB001', orders: 60, pickups: 35, deposits: 25, occupancy: 80 },
                { date: '2020-03-18', boxid: 'CAB002', orders: 44, pickups: 26, deposits: 18, occupancy: 55 }
            ]
        };
    },
    computed: {
        maxChartValue() {
            return Math.max(...this.chartData.map(d => d.value), 1);
        }
    },
    methods: {
        handleQuery() {
            this.$message.info('查询中...');
        },
        handleReset() {
            this.dateRange = [];
            this.selectedBox = '';
        },
        progressColor(val) {
            if (val >= 80) return '#F56C6C';
            if (val >= 60) return '#E6A23C';
            return '#67C23A';
        }
    }
};
</script>

<style scoped>
.container {
    padding: 10px;
}
.filter-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.stat-cards {
    margin-bottom: 20px;
}
.stat-card {
    position: relative;
    overflow: hidden;
    color: #fff;
    padding: 10px 0;
}
.stat-card-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-card-2 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
.stat-card-3 { background: linear-gradient(135deg, #fa709a, #fee140); }
.stat-card-4 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-content {
    padding: 10px;
}
.stat-num {
    font-size: 32px;
    font-weight: bold;
}
.stat-label {
    font-size: 14px;
    margin-top: 4px;
    opacity: 0.9;
}
.stat-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 48px;
    opacity: 0.3;
}
.chart-row {
    margin-bottom: 20px;
}
.chart-placeholder {
    height: 180px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
    padding: 10px;
}
.bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}
.bar {
    width: 100%;
    background: linear-gradient(180deg, #409EFF, #79bbff);
    border-radius: 4px 4px 0 0;
    min-height: 4px;
    transition: height 0.3s;
}
.bar-label {
    font-size: 11px;
    color: #666;
}
.bar-value {
    font-size: 12px;
    color: #409EFF;
    font-weight: bold;
}
.pie-placeholder {
    padding: 20px 10px;
}
.pie-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
}
.pie-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    flex-shrink: 0;
}
.pie-name {
    flex: 1;
    color: #333;
}
.pie-val {
    font-weight: bold;
    color: #409EFF;
}
.detail-card {
    margin-top: 4px;
}
</style>
