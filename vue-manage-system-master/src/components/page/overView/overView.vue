<template>
    <div class="overView">
        <el-amap vid="amap" :plugin="plugin" :center="center" class="amap-demo">
            <!-- <el-amap-marker v-for="(marker, index) in cityData" :key="index" vid="component-marker" :position="marker.position" :content="marker.content" ></el-amap-marker> -->
        </el-amap>
    </div>
</template>
<script>
import Vue from 'vue';
import AMap from 'vue-amap';
setTimeout(() => {
    Vue.use(AMap)
}, 0)

AMap.initAMapApiLoader({
    key: '5df69c069a2022a351d5b367efe51db8',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
      'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
      'AMap.CircleEditor', 'AMap.Geolocation'],
  });
export default {
    data(){
        let self=this
        return {
            positions: {
                lng: '',
                lat: '',
                address: '',
                loaded: false
            },
            center: [121.59996, 31.197646],
            plugin: [
                {
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 100,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                    extensions:'all',
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                           o.getCurrentPosition((status, result)=>{
                               console.log(result)
                           })
                        }
                    }
                }
            ],
            cityData: [
                {
                position: [113.78109,35.19799],
                content: '郑州',
                contry: '中国'
                },
                {
                position: [116.30621, 39.976121],
                content: '北京',
                contry: '中国'
                },
                {
                position: [108.909426,34.513185],
                content: '西安1',
                contry: '中国'
                },
                {
                position: [118.919945,32.374795],
                content: '南京',
                contry: '中国'
                }
            ]
        }
    },
    created () {
        
    },
    mounted () {

    }
}
</script>
<style scoped>
.amap-demo{
    width: 100%;
    height: 500px;
}
</style>