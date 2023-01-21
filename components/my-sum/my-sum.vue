<template>
	<view class="sum-container">
		<label class="radio" @click="changeChecked">
			<radio color="#C00000" :checked="checked" />
			<text>全选</text>
		</label>
		
		<!-- 中间区域 -->
		<view class="sum">
			合计:<text class="amount">￥{{ totalPrice | toFixed}}</text>
		</view>
		
		<!-- 确定结算 -->
		<view class="confirm-sum">
			结算({{ checkedTotal }})
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		name:"my-sum",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('my_cart',['checkedTotal','total','totalPrice']),
			checked(){
				// 商品->全选
				return this.total === this.checkedTotal;
			}
		},
		methods:{
			...mapMutations('my_cart',['selectAll']),
			changeChecked()
			{
				const status = this.checked;
				this.selectAll(!status);
			}
		},
		filters:{
			toFixed(value){
				return Number(value).toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
.sum-container{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 50px;
	padding-left: 5px;
	font-size: 14px;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount
	{
		color:#C00000
	}
	.confirm-sum
	{
		padding:0 10px;
		height: 50px;
		min-width: 100px;
		text-align: center;
		line-height: 50px;
		color: white;
		background-color: #C00000;
	}
}
</style>