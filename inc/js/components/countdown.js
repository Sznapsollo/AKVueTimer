const CountDown = { 
		template: `
			<div id="counterBox">
				<div class="container result">
					<div>
						<h1 id="timeText" >{{timeValue}}</h1>
					</div>
				</div>
				<div class="container">
					<button type="button" class="btn btn-success btn-lg" v-if="!counting && secondsValue>0" v-on:click="startCount()">Start</button>
					<button v-if="counting" type="button" class="btn btn-danger btn-lg" v-on:click="stopCount()">Stop</button>
					<button type="button" class="btn btn-default btn-lg" v-on:click="resetCount()">Reset</button>
				</div>
				<div class="container" v-if="!counting && secondsValue>0">
					<div class="form-inline justify-content-center" >
						<label for="hours">Hours:&nbsp</label>
						<input name="hours" class="form-control" type="number" min="0" max="999" v-model="hours" @change="refreshOutput" placeholder="hours"/>
						&nbsp&nbsp
						<label for="hours">Minutes:&nbsp</label>
						<input name="minutes" class="form-control" type="number" min="0" max="60" v-model="minutes" @change="refreshOutput" placeholder="minutes" />
						&nbsp&nbsp
						<label for="hours">Seconds:&nbsp</label>
						<input name="seconds" class="form-control" type="number" min="0" max="60" v-model="seconds" @change="refreshOutput" placeholder="seconds" />
					</div>
				</div>
			</div>`,
		data: function() {
			return {
				counting: false,
				secondsValue: 0,
				hours: 1,
				minutes: 0,
				seconds: 0,
				timeValue: '',
				counterTimerAnchor: null
			}
		},
		methods: {
			decrementSecond: function() {
				this.secondsValue--;
				
				if(this.secondsValue > 0) {
					this.counterTimerAnchor = setTimeout(this.decrementSecond, 1000);
				}
				else {
					this.counting = false;
					clearTimeout(this.counterTimerAnchor);
				}
				this.updateOutput();
			},
			startCount: function() {
				this.counting = true;
				this.counterTimerAnchor = setTimeout(this.decrementSecond, 1000);
				this.updateOutput();
			},
			stopCount: function() {
				this.counting = false;
				clearTimeout(this.counterTimerAnchor);
				this.updateOutput();
			},
			resetCount: function() {
				this.stopCount();
				this.refreshOutput();
			},
			calculateSeconds: function() {
				this.secondsValue = this.hours*60*60 + this.minutes*60 + this.seconds;
			},
			refreshOutput: function() {
				this.calculateSeconds();
				this.updateOutput();
			},
			updateOutput: function() {
				this.timeValue = moment.utc(this.secondsValue*1000).format('HH:mm:ss');
			}
		},
		created: function() {
		},
		mounted: function() {
			this.refreshOutput();
		}
	}
