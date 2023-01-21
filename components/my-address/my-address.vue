<template>
	<view>
		<!-- 选择收货 -->
		<view class="address-choice" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="choice-button" @click="chooseAddress">请选择收货地址</button>
		</view>

		<!-- 已经选择完毕  显示地址 -->
		<view class="address-show" v-else @click="chooseAddress">
			<view class="first-line">
				<view class="left">
					收货人: {{ address.userName }}
				</view>

				<view class="right">
					<view class="phone">电话：<text>{{ address.telNumber }}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>

			<view class="second-line">
				收货地址: {{ addAvert }}
			</view>
		</view>

		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('my_users',['updateAddress']),
			async chooseAddress()
			{
				const [err,success] = await uni.chooseAddress().catch(err => err);
				if(err === null && success.errMsg === 'chooseAddress:ok')
				{
					this.updateAddress(success);
				}
			}
		},
		computed:{
			...mapState('my_users', ['address']),
			...mapGetters('my_users',['addAvert'])
		}
	}
</script>

<style lang="scss">
	.address-choice {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-show {
		height: 90px;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.first-line {
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;

				.phone {
					margin-right: 5px;
				}
			}
		}

		.second-line {
			margin-top: 10px;
		}
	}

	.address-border {
		width: 100%;
		height: 5px;
		display: block;
	}
</style>
