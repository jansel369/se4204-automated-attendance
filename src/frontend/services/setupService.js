function setupService(url, beforeHook = {}, afterHook = {}) {
	return function createPlugin() {
		const app = this;
		app.service(url);
			// .hooks({
			// 	after: afterHook,
			// 	before: beforeHook
			// });
	}
}

export default setupService;