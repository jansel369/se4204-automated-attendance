import { observable, action } from 'mobx';
import app from '../client';
import { uuid, setProperty } from '../utils/';

class StudentStore {

    @observable students = [];
    @observable presentStudents = [];
    @observable absentStudents = [];
    @observable presentNames = [];
    // @observable selectedDate = "2018-3-1";
    @observable selectedDate = new Date(Date.now()).toLocaleDateString();
    @observable logs = [];
    @observable todaysLog = [];
    @observable newStudent = {
        idNumber : '',
        password : '',
        name : '',
        passcode : '',
        email : '',
    }
    @observable loggedInUser = {
        idNumber : '',
        password : '',
        name : '',
        passcode : '',
        email : '',
    }
    @observable userHasLoggedIn = false;
    @observable startTime = "2:30";
    @observable endTime = "5:30";

    constructor() {
        this.initialize();
        setInterval(async () => {
            await this.checktime();
        }, 5000);
    }

    generatePasscode() {
        this.newStudent.passcode = uuid();
    }

    async register() {
        this.generatePasscode();
        const { email, name, passcode} = this.newStudent;
        await app.service('/api/students').create(this.newStudent);
        await app.service('/custom').patch(null, {email, name, passcode});
        // await this.sendEmail(email, name, passcode);
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

    async checktime() {
        const currentTime = new Date(Date.now()).toLocaleTimeString();
        const currentHr = currentTime.split(":")[0];
        const currentMin = parseInt(currentTime.split(":")[1]);
        const startHr = this.startTime.split(":")[0];
        const startMin = parseInt(this.startTime.split(":")[1]);
        const difference = currentMin - startMin;
        if (currentHr !== startHr) {
            await this.logAbsentStudents();
        }
        else {
            if (difference >= 15) {
                await this.logAbsentStudents();
            }
        }
    }

    async logAbsentStudents() {
        const absenots = this.students.filter(student => !this.presentNames.includes(student.idNumber));
        console.log("MGA DUNGOL: ", absenots);
        absenots.forEach(async (absentee) => {
            const createData = {
                student : absentee,
                date : new Date(Date.now()).toLocaleString(),
                time : "N/A",
                subj : "Computer Architecture II",
                passcode : absentee.passcode,
            }
            if (!this.absentStudents.includes(absentee.idNumber)) {
                await app.service('/api/logs').create(createData);           
                this.logs.push(createData); 
                this.todaysLog.push(createData);
            }
            this.absentStudents.push(absentee.idNumber);
        });
    }


    async retrieveStudents() {
        this.students = await app.service('/api/students').find();
        this.students = await Promise.all(this.students.map(async (student) => {
            let record = await app.service('/api/logs').find({query : {passcode : student.passcode}});
            const presents = await record.filter((rec) => rec.time !== "N/A");
            const absent = await record.filter((rec) => rec.time === "N/A");
            return {...student, attendance : presents.length, absents : absent.length};
        }));
    }
    
 
    async initialize() {
        await this.retrieveStudents();
        console.log(this.students.slice());
        this.setTodayDate();
        this.students = await app.service('/api/students').find();
        this.logs = await app.service('/api/logs').find();
        this.presentNames = this.logs.filter((log) => log.time !== "N/A");
        this.presentNames = this.presentNames.map((log) => log.student.idNumber);
        console.log(this.presentNames.slice(), ' PRESENT NAMES');
        this.presentStudents = this.students.filter((student) => this.presentNames.includes(student.idNumber));
        console.log("PRESENT STUDENTS: ", this.presentStudents.slice());
        this.todaysLog = await app.service('/api/logs').find({query : {date : this.selectedDate}});
        await this.retrieveStudents();

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
                    passcode : foundStudent[0].passcode,
                }
                await app.service('/api/logs').create(createData);
                app.service('/custom').update('5aa6a508f4ad6f09543c8a2b', {name : foundStudent[0].name, msg : "SUCCESS"});
            }
            else {
                app.service('/custom').update('5aa6a508f4ad6f09543c8a2b', {name : "N/A", msg : "FAIL"});    
            }
        });

        app.service('/api/logs').on('created', (newLog) => {
            // console.log("NEW LOG: ", newLog);
            this.logs.push(newLog);
            if (newLog.date === this.selectedDate) {
                this.todaysLog.push(newLog);                
            }
            if (newLog.time !== "N/A" && !this.presentStudents.includes(newLog.student.idNumber)) {
                this.presentStudents.push(newLog.student.idNumber);            
            }
        });
    }


}

export default new StudentStore();