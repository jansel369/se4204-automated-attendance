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
    @observable loggedInUser = {
        idNumber : '',
        password : '',
        name : '',
        passcode : '',
    }
    @observable userHasLoggedIn = false;

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

    async login() {
        const user = await app.service('/api/students').find(
            {query : {idNumber : this.loggedInUser.idNumber, password : this.loggedInUser.password}});
        console.log('user: ', user[0]);
        if (user) {
            this.loggedInUser = user[0];
            this.userHasLoggedIn = true;
        }
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