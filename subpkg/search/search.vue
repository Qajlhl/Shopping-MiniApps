<template>
	<view>
		<view class="search-box">
		  <uni-search-bar radius="100" placeholder="请输入搜索内容......" @input="input" />
		</view>
		
		<view class="history-box" v-show="searchList.length == 0">
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="deleteAllHistory"></uni-icons>
			</view>
			
			<!-- 历史列表 -->
			<view class="search-history">
				<uni-tag v-for="(item,index) in history" :key="index" :text="item" @click="gotoGoodsList(item)"/>
			</view>
		</view>
		
		
		<!-- 建议列表区域 -->
		<view class="search-list">
			<view class="item" v-for="(element,index) in searchList" :key="element.goods_id" @click="gotoDetail(element.goods_id)">
				<view class="name">{{ element.goods_name }}</view>
				<uni-icons type="arrowright" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				timer:null,
				searchList:[],
				// 搜索历史
				history:[]
			};
		},
		onLoad()
		{
			this.history = JSON.parse(uni.getStorageSync('history') || '[]');
		},
		methods:{
			input(value){
				//防抖处理
				if(this.timer)
				{
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(()=>{
					// 将输入框内输入的内容赋值给 value
					this.value = value;
					// 开始根据输入的关键词给出建议列表
					this.getSearchList();
					this.saveHistroy();
				},500);
				
			},
			saveHistroy()
			{
				this.history.unshift(this.value);
				const set = new Set(this.history);
				this.history = Array.from(set);
				
				// 持久化存储搜索历史记录  同步接口 (key，value)
				uni.setStorageSync('history',JSON.stringify(this.history));
			},
			async getSearchList(){
				if(this.value === '')
				{
					this.searchList = [];
					return;
				}
				//console.log(this.value)
				const { data } = await uni.$http.get('/api/public/v1/goods/qsearch',{ query:this.value });
				//console.log(data);
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				this.searchList = data.message;
			},
			gotoDetail(id)
			{
				uni.navigateTo({
					url:'/subpkg/goods-detail/goods-detail?id=' + id
				})
			},
			deleteAllHistory()
			{
				// 删除所有的历史记录
				this.history = [];
				uni.removeStorageSync('history');
			},
			gotoGoodsList(value)
			{
				uni.navigateTo({
					url:'/subpkg/goods-list/goods-list?query=' + value
				})
			}
			
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 9999;	
}
.history-box{
	padding:0 5px;
	
	.history-title{
		height:40px;
		font-size: 17px;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.history-list
	{
		display:flex;
		flex-wrap: wrap;
		
		// .uni-tag{
		// 	//margin:5px 5px 0 0;
		// 	 margin-top:5px;
		// 	// margin-right:5px;
		// }
	}
	
}
.search-list{
	display: flex;
	flex-flow: column nowrap;
	padding:0 5px;
	
	.item{
		font-size: 12px;
		padding: 13px 0;
		display: flex;
		border-bottom: 1px solid #efefef;
		
		view{
			
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
</style>
