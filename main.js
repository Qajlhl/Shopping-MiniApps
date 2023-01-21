
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options)
{
	uni.showLoading({
		title:"正在加载中......"
	})
}

$http.afterRequest = function(options)
{
	uni.hideLoading();
}

uni.$showFail = function()
{
	uni.showToast({
		titile:'数据获取失败',
		duration:1500,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()