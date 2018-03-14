import setupService from './setupService';

function setupStudentService(db) {
  const beforeHook = {};
  const afterHook = {};
  return setupService(db, '/api/students', 'students', beforeHook, afterHook);
}

export default setupStudentService;
