<template>
	<view class="container" :style = "{ 'background-color': bgcolor }" @click="searchBoxHandler">
		<view class="search-box" :style="{ 'border-radius' : bdradius + 'px'}">
			<uni-icons type="search" size="20"/>
			<text class="implication">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			
			bdradius:{
				type:Number,
				default:15
			}
		},
		methods:{
			searchBoxHandler()
			{
				//触发父组件的myclick事件
				this.$emit('myclick');
			}
		}
	}
</script>

<style lang="scss">
.container{
	height:50px;
	padding:0 10px;
	display: flex;
	align-items: center;
	
	.search-box{
		height: 36px;
		background: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.implication{
		margin-left: 5px;
		font-size: 15px;
	}
}
</style>