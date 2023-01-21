import { mapGetters } from 'vuex'
export const mixin = {
	watch:{
		total(){
			this.setCartNum();
		}
	},
	computed:{
		...mapGetters('my_cart',['total'])
	},
	methods:{
		setCartNum()
		{
			uni.setTabBarBadge({
				index:2,
				text:this.total + ''
			})
		}
	},
	onShow(){
		this.setCartNum();
	}
}