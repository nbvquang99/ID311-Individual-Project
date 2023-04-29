class Subject {
	constructor() {
		this.unsubscribeAll()
	}

	subscribe(obs) {
		if (obs != null) this.observers.push(obs);
	}

	unsubscribe(obs) {
		if (obs != null) {
			this.observers = this.observers.filter(x => x!== obs);
		}
	}

	unsubscribeAll() {
		this.observers = []
	}
	
	notifySubscribers(source, ...others) {
		for (let obs of this.observers)
			if (obs != null) obs.update(source, ...others);
	}
}

export { Subject };
