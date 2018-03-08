import setupService from './setupService';

function setupLogsService(db) {
  const beforeHook = {
    find: [
      (app) => {
        app.result = { test: 'foo' };
      }
    ],
  };
  const afterHook = {};
  return setupService(db, 'api/logs', 'logs', beforeHook, afterHook);
}

export default setupLogsService;
