import vue from 'vue';
import vuex from 'vuex';
import cartMoudle from './cart.js'
import usersMoudle from './users.js'
vue.use(vuex);
const store = new vuex.Store({
	modules:{
		my_cart:cartMoudle,
		my_users:usersMoudle
	}
})
export default store;