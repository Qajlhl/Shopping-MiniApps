export default({
	namespaced: true,
	state:()=>({
		cartBox:JSON.parse(uni.getStorageSync('cartBox') || '[]')
	}),
	mutations:{
		addToCart(state,value)
		{
			// value商品是否已经加入过购物车
			const res = state.cartBox.find((item)=>{
				return item.goods_id === value.goods_id;
			});
			
			if(res === undefined)
			{
				// 未加入过
				state.cartBox.push(value);
			}
			else
			{
				res.goods_count++;
			}
			
			// 数据处理完毕
			this.commit('my_cart/saveToStorage');
		},
		
		// 持久化存储购物车中的数据
		saveToStorage(state)
		{
			uni.setStorageSync('cartBox',JSON.stringify(state.cartBox));
		},
		
		updateGoods(state,e)
		{
			const result = state.cartBox.find((item)=>{
				return item.goods_id === e.id;
			})
			if(e.type === 0)
			{
				// 修改商品状态
				if(result)
				{
					result.goods_status = result.goods_status === true? false : true ;
				}
			}
			if(e.type === 1)
			{
				// 修改商品数量
				if(result)
				{
					result.goods_count ++;
				}
			}
			
			this.commit('my_cart/saveToStorage');
		},
		
		deleteGooods(state,event)
		{
			const result = state.cartBox.find((item)=>{
				return item.goods_id === event.goods_id;
			})
			if(result)
			{
				state.cartBox.pop(result);
				uni.showToast({
					title:'删除成功!',
					icon:'none',
					duration:1500
				})
			}
			this.commit('my_cart/saveToStorage');
		},
		
		selectAll(state,value)
		{
			console.log(value)
			state.cartBox.forEach((item)=>{
				item.goods_status = value;
			})
			this.commit('my_cart/saveToStorage');
		}
		
	},
	getters:{
		// 计算商品中全部商品的数量
		total(state)
		{
			let t = 0;
			for(let item of state.cartBox)
			{
				t += item.goods_count;
			}
			return t;
		},
		// 计算勾选了的商品总数
		checkedTotal(state)
		{
			const arr = state.cartBox.filter((item) => {
				return item.goods_status;
			})
			return arr.reduce((total,b)=>{
				return total += b.goods_count;
			},0)
		},
		totalPrice(state)
		{
			// 勾选了的商品总价
			const arr = state.cartBox.filter((item)=>{
				return item.goods_status;
			})
			if(arr.length === 0)
			{
				return 0;
			}
			let sum = 0;
			arr.forEach((item)=>{
				sum += item.goods_count * item.goods_price;
			})
			return sum;
		}
	}
})