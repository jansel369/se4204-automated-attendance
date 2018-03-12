import { observable, action } from 'mobx';
import app from '../client';
import { uuid, setProperty } from '../utils/';

class StudentStore {

    @observable students = [];
    @observable presentStudents = [];
    @observable absentStudents = [];
    @observable selectedDate = "2018-3-1";
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
        this.logs = await app.service('/api/logs').find();

        app.service('/custom').on('created', async (createdPass) => {
            // console.log("CREATED PASSCODE: ", createdPass.ops[0]);
            const data = createdPass.ops[0];
            console.log("PASSCODE: ", data.passcode);
            const foundStudent = await app.service('/api/students').find({query : {passcode : data.passcode}});
            // console.log(foundStudent, ' found student');
            if (foundStudent.length > 0) {
                const createData = {
                    student : foundStudent[0],
                    date : data.date.substring(0, 8),
                    time : data.date.substring(10, 17),
                    subj : "Computer Architecture II",
                }
                await app.service('/api/logs').create(createData);
            }
        });

        app.service('/api/logs').on('created', (newLog) => {
            console.log("NEW LOG: ", newLog);
            this.logs.push(newLog);
        });
    }


}

export default new StudentStore();