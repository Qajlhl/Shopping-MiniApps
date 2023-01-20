<template>
	<view class="goods-list">
		<view class="goods" v-for="(item,index) in goods" @click="gotoDetail(item)">
			<view class="left">
				<image :src="item.goods_small_logo || defaultPic" mode="widthFix" />
			</view>
			
			<view class="right">
				<view class="description">
					{{ item.goods_name }}
				</view>
				
				<view class="item-price">
					￥{{ item.goods_price | tofixed }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goods:[],
				total:0,
				isLoading:false,
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		onPullDownRefresh() {
			// 下拉刷新 数据重新加载
			this.goods = [];
			this.total = 0;
			this.queryObj.pagenum = 1;
			this.isLoading = false;
			
			this.getGoodsList(()=> uni.stopPullDownRefresh() );
			
			// 数据加载完毕 需要手动关闭
			//uni.stopPullDownRefresh();
		},
		onReachBottom(){
			if(this.isLoading)
			{
				return;
			}
			
			// 判断数据是否全部加载完成
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
			{
				uni.showToast({
					icon:'none',
					title:"数据加载完毕!",
					duration:1500
				})
				return;
			}
			// 继续请求新数据
			this.queryObj.pagenum += 1;
			this.getGoodsList();
		},
		filters:{
			tofixed(num)
			{
				return Number(num).toFixed(2);
			}
		},
		onLoad(options){
			console.log(options.id);
			this.queryObj.cid = options.id || '';
			this.queryObj.query = options.query || '';
			this.getGoodsList();
		},
		methods: {
			gotoDetail(item)
			{
				uni.navigateTo({
					url:'/subpkg/goods-detail/goods-detail?id=' + item.goods_id
				})
			},
			async getGoodsList(callback)
			{
				// 节流处理
				this.isLoading = true;
				const { data } = await uni.$http.get('/api/public/v1/goods/search',this.queryObj);
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				
				callback && callback();
				
				this.goods = this.goods.length === 0? data.message.goods : this.goods.concat(data.message.goods);
				this.total = data.message.total;
				
				this.isLoading = false;
		    }
	    },
	}
</script>

<style lang="scss">
.goods-list{
	.goods{
		display: flex;
		padding: 10px 5px;
		.left{
			margin-right: 5px;
			
			image{
				width: 100px;
				height: 100px;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.description{
				font-size: 13px;
			}
			.item-price{
				font-size: 16px;
				color: #C00000;
			}
		}
	}
	
}
</style>
