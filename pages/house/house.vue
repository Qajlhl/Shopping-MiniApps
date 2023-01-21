<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box">
		  <my-search @myclick="showDetail" ></my-search>
		</view>
		
		
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in siwperList" :key="index">
				<navigator class="swiper-item" open-type="navigate" :url="'/subpkg/goods-detail/goods-detail?id=' + item.goods_id">
					<image :src="item.image_src" />
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 导航条 -->
		<view class="nav-list">
			<view v-for="(item,index) in navList" :key="index" @click="changePage(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor-list">
			<view v-for="(item,index) in floorList" :key="indexs">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				
				<!-- 楼层产品区域 -->
				<view class="product">
					<navigator class="product-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					
					<view class="product-right">
						<navigator class="product-item" v-for="(element,i) in item.product_list" :url="element.url" :key="i" v-if="i != 0" >
							<image :src="element.image_src" :style="{ width: element.image_width + 'rpx' }" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mixin } from '../../mixin/mixin.js'
	export default {
		data() {
			return {
				siwperList:[],
				// 导航条
				navList:[],
				floorList:[]
			}
		},
		onLoad(){
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			async getSwiperList(){
				const {data} = await uni.$http.get('/api/public/v1/home/swiperdata');
			    if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				this.siwperList = data.message;
			},
			async getNavList(){
				const { data } = await uni.$http.get('/api/public/v1/home/catitems');
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				this.navList = data.message;
			},
			changePage(item)
			{
				if(item.name === "分类")
				{
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFloorList(){
				const { data } = await uni.$http.get('/api/public/v1/home/floordata');
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				
				data.message.forEach((item)=>{
					item.product_list.forEach((element) => {
						element.url = '/subpkg/goods-list/goods-list?' + element.navigator_url.split('?')[1];
					})
				})
				
				this.floorList = data.message;
			},
			showDetail()
			{
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		mixins:[mixin]
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top:0;
	z-index: 999;
}
swiper{
	height: 330rpx;
	.swiper-item,image{
		height: 100%;
		width: 100%;
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin:15px 0;
	image{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title{
	width: 100%;
	height: 60rpx;
	
}
.product{
	display: flex;
	.product-left{
		padding-left: 10rpx;
	}
	.product-right{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around; 
	}
}

</style>
