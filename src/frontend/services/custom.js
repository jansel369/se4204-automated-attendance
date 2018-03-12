import setupService from './setupService';


function setupFoodService() {
	const beforeHook = {};
	const afterHook = {};
	return setupService('/custom', beforeHook, afterHook);
}

export default setupFoodService;