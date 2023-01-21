<template>
	<view>
		<view class="full" v-if="cartBox.length != 0">
			<!-- 地址区域 -->
			<my-address></my-address>
			
			<!-- 购物栏标题区域 -->
			<view class="cart-title">
				<uni-icons type="shop" size="18" />
				<text class="title">购物车</text>
			</view>
			
			<!-- 商品区域 -->
			<uni-swipe-action class="body">
				<block v-for="(item,index) in cartBox" :key="index">
			
					<uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
						<view class="goods-info">
							<!-- 是否选中 -->
							<view class="left">
								<radio :checked="item.goods_status" color="#C00000" :value="item.goods_id"
									@click="changeChecked(item.goods_id)" />
							</view>
			
							<!-- 图片区域 -->
							<view class="middle">
								<image :src="item.goods_small_logo"></image>
							</view>
			
							<!-- 商品信息区域 -->
							<view class="right">
								<view class="name">
									{{ item.goods_name }}
								</view>
			
								<view class="bottom">
			
									<view class="price">
										￥{{ item.goods_price | tofixed }}
									</view>
			
									<uni-number-box :min="1" :value="item.goods_count"
										@change="countChange(item.goods_id)" />
								</view>
							</view>
						</view>
			
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			
			<!-- 结算区域 -->
			<my-sum></my-sum>
		</view>
	    
		<!-- 购物车为空 -->
		<view class="empty" v-else>
			<image src="/static/cart_empty@2x.png" class="empty-img"/>
			<text class="nothing">空空如也</text>
		</view>
	</view>
</template>

<script>
	import {
		mixin
	} from '../../mixin/mixin.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [
				{
					text:'删除',
					style:{
						backgroundColor:'#dd524d'
					}
				}
				]
			}
		},
		computed: {
			...mapState('my_cart', ['cartBox'])
		},
		methods: {
			...mapMutations('my_cart', ['updateGoods','deleteGooods']),
			changeChecked(value) {
				const e = {
					id: value,
					type: 0
				}
				this.updateGoods(e);
			},
			countChange(id) {
				const e = {
					id: id,
					type: 1,
				}
				this.updateGoods(e);
			},
			deleteGoods(event)
			{
				this.deleteGooods(event);
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2);
			}
		},
		mixins: [mixin]
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.title {
			margin-left: 10px;
		}
	}

	.goods-info {

		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.left {
			align-self: center;
		}

		.middle {
			margin-right: 5px;

			image {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name {
				font-size: 13px;
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					font-size: 16px;
					color: #C00000;
				}
			}

		}


	}

    .empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 180px;
		.empty-img{
			width: 90px;
			height: 90px;
		}
		.nothing{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
