import setupService from './setupService';

function setupLogsService(db) {
  const beforeHook = {};
  const afterHook = {};
  return setupService(db, 'api/logs', 'logs', beforeHook, afterHook);
}

export default setupLogsService;
