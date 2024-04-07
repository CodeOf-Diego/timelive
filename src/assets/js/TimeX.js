/*
Definition of the variable that describes time for this project
for now the object contains one int value that directly correspond to the time description of the objects
*/
export default class TimeX {

	constructor() {
	   this.data = 0;
	}

	set(data) {
	   this.data = parseInt(data);
	}

	get() {
		return this.getTimeValue();
	}

	getTimeValue() {
		return this.data;
	}
}
