import feathersMongo from 'feathers-mongodb';

function setupService(db, url, collection, beforeHook = {}, afterHook = {}) {
  return function createPlugin() {
    const app = this;
    // app.use(url);
    app.use(url, feathersMongo({ Model: collection }));
    // app.service(url).hooks({ before: { ...beforeHook }, after: { ...afterHook } });
  };
}

export default setupService;
