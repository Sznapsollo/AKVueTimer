Vue.use(VueRouter);
Vue.filter('formatTime', function(value) {
	if (value) {
		return moment(String(value)).format('hh:mm:ss')
	}
});
const router = new VueRouter({
	mode: 'hash',
	base: '',
	routes: [
		{ path: '/countdown', name: 'countdown', component: CountDown },
		{ path: '/about', name: 'about', component: About },
		{ path: '/', name: 'timer', component: Timer }
	]
})

var vm = new Vue({
	router,
	data: {
		
	},
	methods: {
		
	},
	created: function() {
		
	}, 
	mounted: function() {
		
	}
}).$mount('#app')




	