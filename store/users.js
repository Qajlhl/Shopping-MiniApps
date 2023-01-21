export default ({
	namespaced: true,
	state: () => {
		return {
			address: JSON.parse(uni.getStorageSync('address') || '{}')
		}
	},
	mutations: {
		updateAddress(state, value) {
			state.address = value;
			this.commit('my_users/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address));
		}
	},
	getters: {
		addAvert(state) {
			if (state.address.provinceName != '') {
				return state.address.provinceName + state.address.cityName + state.address.countyName + state
					.address.detailInfo;
			}
			return '';
		}
	}
})
