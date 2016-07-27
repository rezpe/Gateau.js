Track = function(object, variable) {
	this.keyframes = [];
	this.object = object;
	this.variable = variable

	this.addKeyframe = function(time, target) {
		this.keyframes.push({
			time : time,
			target : target
		})
	};

	this.evaluate = function(t) {
		if (this.keyframes.length == 0) {
			return
		}

		// Find current keyframe
		var pos = 0
		var currentFrame, targetFrame
		while (pos < this.keyframes.length && t > this.keyframes[pos].time) {
			pos += 1
		}
		
		currentFrame = this.keyframes[pos]

		if (pos == this.keyframes.length) {
			currentFrame = this.keyframes[pos-1]
			this.object[variable] = currentFrame.target			
		
		} else if (pos == this.keyframes.length-1) {
			currentFrame = this.keyframes[pos]
			this.object[variable] = currentFrame.target			
		
		} else {
			targetFrame = this.keyframes[pos + 1]
			var elapsed = t - currentFrame.time
			var duration = targetFrame.time - currentFrame.time
			var alpha = elapsed / duration
			this.object[variable] = (1 - alpha) * currentFrame.target + alpha * targetFrame.target
		}

	}
	
	this.evaluateVal = function(t) {
		if (this.keyframes.length == 0) {
			return 0;
		}

		// Find current keyframe
		var pos = 0
		var currentFrame, targetFrame
		while (pos < this.keyframes.length && t > this.keyframes[pos].time) {
			pos += 1
		}
		
		currentFrame = this.keyframes[pos]

		if (pos == this.keyframes.length) {
			currentFrame = this.keyframes[pos-1]
			return currentFrame.target;			
		
		} else if (pos == this.keyframes.length-1) {
			currentFrame = this.keyframes[pos]
			return currentFrame.target;			
		
		} else {
			targetFrame = this.keyframes[pos + 1]
			var elapsed = t - currentFrame.time
			var duration = targetFrame.time - currentFrame.time
			var alpha = elapsed / duration
			return (1 - alpha) * currentFrame.target + alpha * targetFrame.target;
		}

	}
}