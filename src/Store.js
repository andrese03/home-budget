import { EventEmitter } from 'fbemitter';

const eventEmitter = new EventEmitter();

class Store {

	static addListener(name, callback) {
		return eventEmitter.addListener(name, callback)
	}

	static removeListener(eventListener) {
		eventListener.remove();
	}

	static emit(name, payload) {
		eventEmitter.emit(name, payload);
	}
}

export default Store;