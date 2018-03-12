import setupService from './setupService';
// import { populate } from 'feathers-hooks-common';

// const schema = {
//   include: {
//      service: 'api/supplier',
//      nameAs: 'supplier',
//      parentField: 'supplierId',
//      childField: '_id'
//    }
// };

function setupLogsService(db) {
  const beforeHook = {};
  const afterHook = {
    find : [
			// populate({schema})
		],
    	get : [
			// populate({schema})
		]    
  };
  return setupService(db, 'api/logs', 'logs', beforeHook, afterHook);
}

export default setupLogsService;
