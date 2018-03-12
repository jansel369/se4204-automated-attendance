export function getDateNow() {
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    return dateNow;
  }
  
  export function uuid() {
    function s4() {
      return Math.random()
        .toString()
        .substring(2, 3);
    }
    return `${s4() + s4()}${s4()}${s4()}${
      s4()}${s4()}${s4()}${s4()}`;
  }
  
  export function mapToProperty(array, property) {
    return array.map((arr) => arr[property]);
  }
  
  export function arrayDeleteProperty(array, prop) {
    return array.map((arr) => {
      Reflect.deleteProperty(arr, prop);
      return arr;
    });
  }
  
  export function retrieveCollection(app, api, params = {}) {
    return app.service(api).find(params);
  }
  
  export function setProperty(object, property, value) {
    object[property] = value;
  }
  
  export function removeFromArray(array, keyword, value) {
    array.forEach(arr => console.log('keyword: ', arr[keyword], ' value ', value));
    const index = array.indexOf(array.find((arr) => arr[keyword] === value));
    if (index > -1) {
      array.splice(index, 1);
      console.log(array, ' ang array');
    }
  }
  
  export function formatCamelCase(word) {
    return word.charAt(0).toUpperCase() + word.replace(/([A-Z])/g, ' $1').slice(1);
  }
  
  export function replaceInArray(array, oldObject, newObject) {
    const index = array.indexOf(oldObject);
    array[index] = newObject;
  }
  
  export function getValues(obj) {
    const keys = Object.keys(obj);
    return keys.map((key) => obj[key]);
  }
  
  export function searchByFilter(object, property, filterProperty, filterValue) {
    return object[property].filter((obj) => obj[filterProperty] === filterValue);
  }
  
  export function serveEvent(app, api, action, callback) {
    app.service(api).on(action, callback);
  }
  
  export function findInArray(array, object, prop)  {
    return array.find((obj) => obj[prop] === object[prop]);
  }
  
  export function deleteProperties(obj, properties) {
    properties.forEach((prop) => {
      Reflect.deleteProperty(obj, prop);
    });
  }

  