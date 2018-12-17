const Timer = { 
		template: `
			<div id="counterBox">
				<div class="container result">
					<div>
						<h1 id="timeText" >{{timeValue}}</h1>
					</div>
				</div>
				<div class="container">
					<button type="button" id="buttonStart" class="btn btn-success btn-lg" v-if="!counting" v-on:click="startCount()">Start</button>
					<button v-if="counting" type="button" id="buttonStop" class="btn btn-danger btn-lg" v-on:click="stopCount()" >Stop</button>
					<button v-if="secondsValue>0" type="button" id="buttonReset" class="btn btn-default btn-lg" v-on:click="resetCount()">Reset</button>
				</div>
			</div>`,
		data: function() {
			return {
				counting: false,
				secondsValue: 0,
				timeValue: '',
				counterTimerAnchor: null
			}
		},
		methods: {
			focusStart: function() {
				setTimeout(function() {$("#buttonStart").focus();},100);
			},
			focusStop: function() {
				setTimeout(function() {$("#buttonStop").focus();},100);
			},
			incrementSecond: function() {
				this.secondsValue++;
				this.counterTimerAnchor = setTimeout(this.incrementSecond, 1000);
				this.updateOutput();
			},
			startCount: function() {
				this.counting = true;
				this.counterTimerAnchor = setTimeout(this.incrementSecond, 1000);
				this.updateOutput();
				this.focusStop();
			},
			stopCount: function() {
				this.counting = false;
				clearTimeout(this.counterTimerAnchor);
				this.updateOutput();
				this.focusStart();
			},
			resetCount: function() {
				this.stopCount();
				this.secondsValue = 0;
				this.updateOutput();
			},
			updateOutput: function() {
				this.timeValue = moment.utc(this.secondsValue*1000).format('HH:mm:ss');
			}
		},
		created: function() {
		},
		mounted: function() {
			this.updateOutput();
			this.focusStart();
		}
	}
