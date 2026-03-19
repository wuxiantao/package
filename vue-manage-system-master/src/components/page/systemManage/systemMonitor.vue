<template>
    <div class="systemMonitor">
        <div class="container">
            <!-- 刷新按钮 -->
            <div class="toolbar">
                <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh" :loading="refreshing">刷新监控数据</el-button>
                <span class="last-update">最后更新：{{ lastUpdateTime }}</span>
            </div>

            <!-- 系统资源概览 -->
            <el-row :gutter="20" class="monitor-cards">
                <el-col :span="6" v-for="item in monitorItems" :key="item.label">
                    <el-card shadow="hover" class="monitor-card">
                        <div class="monitor-title">{{ item.label }}</div>
                        <el-progress
                            type="dashboard"
                            :percentage="item.value"
                            :color="item.color"
                            :width="100"
                        ></el-progress>
                        <div class="monitor-detail">{{ item.detail }}</div>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 在线柜体状态 -->
            <el-row :gutter="20" class="status-row">
                <el-col :span="12">
                    <el-card shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>柜体在线状态</span>
                            <el-tag type="success" size="mini" style="float:right">实时</el-tag>
                        </div>
                        <el-table :data="cabinetStatus" style="width:100%" size="small">
                            <el-table-column prop="boxid" label="柜编号" width="90"></el-table-column>
                            <el-table-column prop="online" label="在线状态" width="90">
                                <template slot-scope="scope">
                                    <span :class="['status-dot', scope.row.online ? 'online' : 'offline']"></span>
                                    {{ scope.row.online ? '在线' : '离线' }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ip" label="IP地址"></el-table-column>
                            <el-table-column prop="version" label="固件版本" width="90"></el-table-column>
                            <el-table-column prop="uptime" label="运行时长"></el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <div slot="header">系统日志</div>
                        <div class="log-container">
                            <div
                                v-for="(log, idx) in systemLogs"
                                :key="idx"
                                class="log-item"
                                :class="'log-' + log.level"
                            >
                                <span class="log-time">{{ log.time }}</span>
                                <el-tag :type="logTagType(log.level)" size="mini" class="log-level">{{ log.level }}</el-tag>
                                <span class="log-msg">{{ log.message }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 告警信息 -->
            <el-card shadow="hover" class="alert-card">
                <div slot="header" class="clearfix">
                    <span>告警信息</span>
                    <el-badge :value="activeAlerts.length" class="badge-item" style="float:right">
                        <el-button size="mini" type="danger">未处理告警</el-button>
                    </el-badge>
                </div>
                <el-table :data="activeAlerts" style="width:100%" border size="small">
                    <el-table-column prop="time" label="时间" width="160"></el-table-column>
                    <el-table-column prop="level" label="级别" width="80">
                        <template slot-scope="scope">
                            <el-tag :type="alertTagType(scope.row.level)" size="mini">{{ scope.row.level }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="source" label="来源" width="100"></el-table-column>
                    <el-table-column prop="message" label="告警内容"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="handleResolve(scope.row)">处理</el-button>
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
            refreshing: false,
            lastUpdateTime: new Date().toLocaleString(),
            monitorItems: [
                { label: 'CPU使用率', value: 42, color: '#409EFF', detail: '4核 / 8线程' },
                { label: '内存使用率', value: 68, color: '#67C23A', detail: '5.4GB / 8GB' },
                { label: '磁盘使用率', value: 55, color: '#E6A23C', detail: '110GB / 200GB' },
                { label: '网络负载', value: 23, color: '#909399', detail: '上行 1.2Mbps' }
            ],
            cabinetStatus: [
                { boxid: 'CAB001', online: true, ip: '192.168.1.101', version: 'v1.2.3', uptime: '15天3小时' },
                { boxid: 'CAB002', online: true, ip: '192.168.1.102', version: 'v1.2.3', uptime: '12天8小时' },
                { boxid: 'CAB003', online: false, ip: '192.168.1.103', version: 'v1.2.1', uptime: '-' },
                { boxid: 'CAB004', online: true, ip: '192.168.1.104', version: 'v1.2.3', uptime: '20天1小时' }
            ],
            systemLogs: [
                { time: '10:35:02', level: 'INFO', message: '系统启动完成，所有服务正常运行' },
                { time: '10:32:15', level: 'WARN', message: 'CAB003与服务器连接超时，正在重试...' },
                { time: '10:30:00', level: 'ERROR', message: 'CAB003离线，最后心跳时间 10:28:45' },
                { time: '09:55:18', level: 'INFO', message: '定时任务执行完成：清理过期订单数据' },
                { time: '09:30:00', level: 'INFO', message: '数据库备份成功' },
                { time: '08:00:00', level: 'INFO', message: '系统日志自动归档完成' }
            ],
            activeAlerts: [
                { time: '2020-03-19 10:30:00', level: '严重', source: 'CAB003', message: 'CAB003柜体离线，请检查网络连接或电源状态' },
                { time: '2020-03-19 08:30:00', level: '警告', source: 'CAB003', message: 'CAB003冷藏箱温度传感器异常' }
            ]
        };
    },
    methods: {
        handleRefresh() {
            this.refreshing = true;
            setTimeout(() => {
                this.lastUpdateTime = new Date().toLocaleString();
                this.monitorItems[0].value = Math.floor(Math.random() * 40 + 20);
                this.monitorItems[1].value = Math.floor(Math.random() * 30 + 50);
                this.refreshing = false;
                this.$message.success('监控数据已刷新');
            }, 1200);
        },
        logTagType(level) {
            const map = { ERROR: 'danger', WARN: 'warning', INFO: 'info' };
            return map[level] || 'info';
        },
        alertTagType(level) {
            const map = { '严重': 'danger', '警告': 'warning', '提示': 'info' };
            return map[level] || 'info';
        },
        handleResolve(row) {
            this.$confirm(`确认已处理告警：${row.message}？`, '处理告警', { type: 'warning' }).then(() => {
                this.activeAlerts = this.activeAlerts.filter(a => a !== row);
                this.$message.success('告警已标记为处理');
            }).catch(() => {});
        }
    }
};
</script>

<style scoped>
.container {
    padding: 10px;
}
.toolbar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}
.last-update {
    color: #909399;
    font-size: 13px;
}
.monitor-cards {
    margin-bottom: 20px;
}
.monitor-card {
    text-align: center;
    padding: 10px 0;
}
.monitor-title {
    font-size: 14px;
    color: #606266;
    margin-bottom: 8px;
}
.monitor-detail {
    font-size: 12px;
    color: #909399;
    margin-top: 6px;
}
.status-row {
    margin-bottom: 20px;
}
.status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
}
.online { background: #67C23A; }
.offline { background: #F56C6C; }
.log-container {
    max-height: 220px;
    overflow-y: auto;
}
.log-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    gap: 8px;
}
.log-time { color: #909399; width: 65px; flex-shrink: 0; }
.log-level { flex-shrink: 0; }
.log-msg { color: #303133; }
.log-ERROR .log-msg { color: #F56C6C; }
.log-WARN .log-msg { color: #E6A23C; }
.alert-card {
    margin-top: 4px;
}
.badge-item {
    margin-top: 6px;
}
</style>
