/*
 Defines a 1 dimensional abstract variable whose value can change overtime
 The variable can be divided in 1 or more regions of time, each of wich has it's own value
 that can be extracted from any point in the included region

 Note that each region starts from an included timeX to the next timeX excluded, or to infinity for the last region
*/
class TypeX {

	/* The default value of the data is a region going from 0 to infinity with null value */
	constructor() {
	   this.data = [null];
	   this.regions = 1;
	}

	/* Check if region start in given time */
	isRegionStart(timeX) {
		return Object.keys(this.data).indexOf(String(timeX.get())) >= 0;
	}

	/* Find the beginning of a region from a given time */
	findRegionStartTimeX(timeX) {
		let keyframes = Object.keys(this.data);
		return this.findRegionStartRecursive(keyframes, 0, keyframes.length -1, timeX)
	}

	/* Binary search the start time of a region given a time. The start time is included in the region */
	findRegionStartRecursive(keyframes, min, max, timeX) {
		let avg = parseInt((max + min) / 2);
		if (max - min > 1) {
			if (keyframes[avg] < timeX.get())
					return this.findRegionStartRecursive(keyframes, avg, max, timeX);
			else if (keyframes[avg] > timeX.get())
					return this.findRegionStartRecursive(keyframes, min, avg, timeX);
			else
					return keyframes[avg];
		}
		else {
			if (keyframes[max] <= timeX.get())
				return keyframes[max];
			return keyframes[min];
		}
	}

	/* Adds a new value at a specific time, changes the number of total regions */
	set(data, timeX) {
		if (!(this.isRegionStart(timeX)))
				this.regions += 1;
		this.data[timeX.get()] = data;
	}

	/* Removes a region. If removed the 1st of multiple region the next one will expand to time 0 */
	unset(timeX) {
		if (this.regions == 1) {
			this.data = [null];
		}
		else {
			let time = this.findRegionStartTimeX(timeX);
			this.regions -= 1;
			if (time > 0) {
				delete this.data[time];
			}
			else {
				 let keyframes = Object.keys(this.data);
				 this.data[keyframes[0]] = this.data[keyframes[1]];
	 			delete this.data[keyframes[1]];
			}
		}
	}

	/* Return the data value at a specific time */
	get(timeX) {
		return this.data[this.findRegionStartTimeX(timeX)];
	}

	/* Move an existing region start in the timeline. The region starting at 0 cannot be moved */
	move(timeFrom, timeTo) {
		if (this.isRegionStart(timeFrom) && timeFrom.get() != 0 && timeFrom.get() != timeTo.get()) {

			if (this.isRegionStart(timeTo))
				this.regions--;
			this.data[timeTo.get()] = this.data[timeFrom.get()];
			delete this.data[timeFrom.get()];
		}
	}

	duplicate() {
		return jQuery.extend(true, new TypeX, this)
	}
}
