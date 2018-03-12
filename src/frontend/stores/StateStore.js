import { observable, action } from 'mobx';

class StateStore {


 @observable view = "logtable";

  @action.bound
  toggle(prop) {
    this[prop] = !this[prop];
  }
  
  @action.bound
  setView(value) {
    this.view = value;
  }

}

export default new StateStore();
