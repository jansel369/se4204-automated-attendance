import setupService from './setupService';

function setupNotificationService(db) {
  const beforeHook = {};
  const afterHook = {};
  return setupService(db, '/api/notifications', 'notifications', beforeHook, afterHook);
}

export default setupNotificationService;
