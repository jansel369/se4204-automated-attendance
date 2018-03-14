import { observable, action } from 'mobx';

class LogStore {

    @observable students = [];
    @observable logs = [];

    constructor() {

    }

    initialize() {

    }


}

export default new LogStore();