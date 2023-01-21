<template>
	<view class="goods-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 价格区域 -->
			<view class="price">
				￥{{ goods_info.goods_price }}
			</view>
			
			<!-- 信息主体区域 -->
			<view class="body">
				<view class="name">
					{{ goods_info.goods_name }}
				</view>
				
				<!-- 收藏 -->
				<view class="like">
					<uni-icons type="star" color="gray" size="18"/>
					<text>收藏</text>
				</view>
			</view>
			
			
			<!-- 快递区域 -->
			<view class="express">
				快递:免运费
			</view>
			
		</view>
		
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 页面底部 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftclick" @buttonClick="rightClick" />
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				goods_info:{},
				// 底部左侧
				options:[{
					icon:'shop',
					text:'店铺'
				},{
					icon:'cart',
					text:'购物车',
					info:3
				}],
				// 右侧
				buttonGroup:[{
					text:'加入购物车',
					backgroundColor: '#ff0000',
					color:'#fff'
				},
				{
					text:'立即购买',
					backgroundColor:'#ffa200',
					color:'#fff'
				}]
			};
		},
		watch:{
			total:
			{
				handler(newVal)
				{
					//console.log(this.options);
					const result = this.options.find((item)=>{
						return item.text === "购物车";
					})
					
					if(!(result === undefined))
					{
						result.info = newVal;
					}
				}
				
			}
		},
		computed:{
			//调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
			//调用方法：...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
			...mapState('my_cart',['cart']),
			...mapGetters('my_cart',['total'])
		},
		onLoad(options){
			const id = options.id;
			this.getGoodsInfo(id);
		},

		methods:{
			preview(index){
				//console.log(this.goods_info.pics.map( item => item.pics_big ));
				uni.previewImage({
					current:index,
					//urls: ["http://image4.suning.cn/uimg/b2c/newcatentries/0070171196-000000000682357746_2_800x800.jpg", "http://image5.suning.cn/uimg/b2c/newcatentries/0070171196-000000000682357746_1_800x800.jpg", "http://image3.suning.cn/uimg/b2c/newcatentries/0070171196-000000000682357746_3_800x800.jpg", "http://image2.suning.cn/uimg/b2c/newcatentries/0070171196-000000000682357746_4_800x800.jpg", "http://image1.suning.cn/uimg/b2c/newcatentries/0070171196-000000000682357746_5_800x800.jpg"]
					 urls: this.goods_info.pics.map( item => item.pics_big )
				});
			},
			async getGoodsInfo(id){
				const { data } = await uni.$http.get('/api/public/v1/goods/detail',{ goods_id:id });
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				this.goods_info = data.message;
				this.goods_info.goods_introduce = this.goods_info.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g,'jpg')
			},
			...mapMutations('my_cart',['addToCart']),
			leftclick(e){
				//console.log(e);
				if(e.content.text === "购物车")
				{
					// 跳转到购物车
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
				
			},
			rightClick(e)
			{
				if(e.content.text === "加入购物车")
				{
					const goods = {
						goods_name:this.goods_info.goods_name,
						goods_id:this.goods_info.goods_id,
						goods_count : 1,
						goods_price:this.goods_info.goods_price,
						goods_small_logo : this.goods_info.goods_small_logo,
						goods_status:false //该商品的勾选状态
					}
					
					this.addToCart(goods);
				}
			},
			
			
		}
	}
</script>

<style lang="scss">
.goods-container{
	padding-bottom: 50px;
	swiper{
		height: 750rpx;
		swiper-item{
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.goods-info-box{
		padding: 10px;
		padding-right: 0;
		.price{
			margin: 10px 0;
			color: #C00000;
			font-size: 18px;
		}
		.body{
			display: flex;
			justify-content: space-between;
			.name{
				font-size: 13px;
				padding-right: 10px;
			}
			.like{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120px;
				font-size: 12px;
				color:gray;
			}
		}
		.express{
			margin:10px 0;
			font-size: 12px;
			color:gray;
		}
	}
	
	.goods-nav{
		position: fixed;
		bottom: 0;
		left: 0;;
		width:100%;
	}
}
</style>