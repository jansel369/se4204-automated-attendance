import { observable, action } from 'mobx';
import app from '../client';
import { uuid, setProperty } from '../utils/';

class StudentStore {

    @observable students = [];
    @observable logs = [];
    @observable newStudent = {
        idNumber : '',
        password : '',
        name : '',
        passcode : '',
    }

    constructor() {
        this.initialize();
    }

    generatePasscode() {
        this.newStudent.passcode = uuid();
    }

    async register() {
        this.generatePasscode();
        await app.service('/api/students').create(this.newStudent);
        this.resetData();
    }

    resetData() {
        this.newStudent = {
            idNumber : '',
            password : '',
            name : '',
            passcode : '',
        };
    }
 
    async initialize() {
        this.students = await app.service('/api/students').find();
    }


}

export default new StudentStore();