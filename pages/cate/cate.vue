<template>
	<view>
		<my-search @myclick="showDetail"></my-search>
		<view class="scroll-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y :style="{ height:hd + 'px' }" class="scroll-left">
				<view v-for="(item,index) in cateList" :key="index">
					<view :class="['scroll-left-item', index === active? 'active' : '']" @click="changeActive(index)">
						{{ item.cat_name }}
					</view>
				</view>
			</scroll-view>
			
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y :style="{ height:hd + 'px' }" :scroll-top="scrollTop">
				
				<!-- 渲染二级标题 -->
				<view v-for="(item,index) in cateList2" :key="index">
					<view class="cateList2-name">
						/{{ item.cat_name }}/
					</view>
					
					<!-- 渲染三级标题 -->
					<view class="cate-list3">
						<view v-for="(element,i) in item.children" :key="i" class="cate-list3-item" @click="gotoDetail(element.cat_pid)">
							<image :src="element.cat_icon.replace('dev','web')"></image>
							<text> {{ element.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 窗口可用高度 = 屏幕高度 - tabbar高度 - navigationbar高度
				hd:0,
				cateList:[],
				cateList2:[],
				cateList3:[],
				active:0,
				// 滚动条距离顶部
				scrollTop:0
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			this.hd = info.windowHeight - 50;
			this.getCateList();
			
		},
		methods: {
			async getCateList(){
				const { data } = await uni.$http.get('/api/public/v1/categories');
				if(data.meta.status != 200)
				{
					uni.$showFail();
					return;
				}
				this.cateList = data.message;
				
				// 为二级分类赋初值
				this.cateList2 = data.message[0].children;
				
			},
			changeActive(index){
				this.active = index;
				this.cateList2 = this.cateList[index].children;
				this.scrollTop = this.scrollTop === 0? 1 : 0;
			},
			gotoDetail(id){
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?id=' + id
				})
			},
			showDetail(){
				// 跳转到搜索页面
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-container
{
	display: flex;
	.scroll-left {
		width:120px;
		.scroll-left-item{
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			background-color: #f7f7f7;
			
			// 如果class既包含scroll-left-item类名 又包含active类名
			&.active{
				background-color: #ffffff;
				position: relative;
				
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	
    .cateList2-name{
		font-size:12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	
	.cate-list3{
		display: flex;
		flex-wrap: wrap;
		.cate-list3-item{
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image{
				width: 60px;
				height: 60px;
			}
			
			text{
				font-size:12px;
			}
		}
	}
}
</style>
