import { observeable, runInAction, action, computer } from 'mobx';

class LogStore {

    @observeable students = [];
    @observeable logs = [];

    constructor() {

    }

    initialize() {

    }


}