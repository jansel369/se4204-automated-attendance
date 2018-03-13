import { observable, action } from 'mobx';
import app from '../client';
import { uuid, setProperty } from '../utils/';

class StudentStore {

    @observable students = [];
    @observable presentStudents = [];
    @observable absentStudents = [];
    // @observable selectedDate = "2018-3-1";
    @observable selectedDate = new Date(Date.now()).toLocaleDateString();
    @observable logs = [];
    @observable todaysLog = [];
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

    setTodayDate() {
        const today = new Date(Date.now()).toLocaleDateString();
        const split = today.split('/');
        const newDate = split[2] + "-" + split[0] + "-" + split[1];
        this.selectedDate = newDate;
    }

    async manipulateDate(ascend) {
        const d = this.selectedDate.split('-')[2];
        // const parsed = parseInt(d) + 1;
        const parsed = (ascend) ? parseInt(d) + 1 : parseInt(d) - 1;
        console.log(parsed, ' DAYS');
        const parts = this.selectedDate.split('-');
        this.selectedDate = parts[0] + "-" + parts[1] + "-" + parsed;
        await this.retrieveTodaysLogs();
    }

    async retrieveTodaysLogs() {
        this.todaysLog = await app.service('/api/logs').find({query : {date : this.selectedDate}});
    }
 
    async initialize() {
        this.setTodayDate();
        this.students = await app.service('/api/students').find();
        this.logs = await app.service('/api/logs').find();
        this.todaysLog = await app.service('/api/logs').find({query : {date : this.selectedDate}});

        app.service('/api/students').on('created', (newStudent) => {
            this.students.push(newStudent);
        });

        app.service('/custom').on('created', async (createdPass) => {
            // console.log("CREATED PASSCODE: ", createdPass.ops[0]);
            const data = createdPass.ops[0];
            console.log("PASSCODE: ", data.passcode);
            const foundStudent = await app.service('/api/students').find({query : {passcode : data.passcode}});
            // console.log(foundStudent, ' found student');
            if (foundStudent.length > 0) {
                const createData = {
                    student : foundStudent[0],
                    date : data.date.substring(0, 9),
                    time : data.date.substring(10, 18),
                    subj : "Computer Architecture II",
                }
                await app.service('/api/logs').create(createData);
            }
        });

        app.service('/api/logs').on('created', (newLog) => {
            console.log("NEW LOG: ", newLog);
            this.logs.push(newLog);
            if (newLog.date === this.selectedDate) {
                this.todaysLog.push(newLog);                
            }
        });
    }


}

export default new StudentStore();