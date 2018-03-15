import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';

class CustomService {

    constructor(db) {
        this.db = db;
    }
    async create(data, params) {
        // console.log('data: ', data);
        const firstData = Object.getOwnPropertyNames(data)[0];
        let today = new Date(Date.now()).toLocaleString();
        console.log('today : ', today);
        return await this.db.collection('custom').insert
        ({passcode : firstData.toString(), date : today});
        // return await this.db.collection('custom').insert
        // ({passcode : firstData.toString(), date : new Date(Date.now()).toLocaleString()});
    }

    async find(params) {
        return await this.db.collection('custom').find().toArray();
        // console.log('finding');
        // return {msg : "fromfind"};

    }
            //account number
    async get(id, params) {
        // return await Bank.requestAccountDetails(id);
        // console.log('getting');
        // return {msg : "fromget"};
        // console.log("ANG ID: " , ObjectId(id));
        // const results = await this.db.collection('custom').find().toArray();
        // const theOne = await results.find(res => res._id.toString() === id);
        // const msg = theOne.msg;
        // console.log(msg, ' da right one!');
        // return msg;
        return "FAIL";
    }

    async patch(id, data, params) {
        const { email, name, passcode } = data;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'brentuniversitysample@gmail.com',
              pass: 'verystrongpassword'
            }
          });
        
          
          const mailOptions = {
            from: 'brentuniversitysample@gmail.com',
            to: email,
            subject: 'Brent University Student Passcode',
            text: `Welcome to Brent University ${name}! Your generated passcode is ${passcode}`
          };
     
          return await transporter.sendMail(mailOptions);
       
    }

    async update(id, data, params) {
        const { email, name, fail } = data;
        console.log("UDPATE DATA: ", data);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'brentuniversitysample@gmail.com',
              pass: 'verystrongpassword'
            }
          });
          
          const mailOptions = {
            from: 'brentuniversitysample@gmail.com',
            to: email,
            subject: 'Brent University Parental Update',
            text: (fail) ?
            `Greetings Mr/Ms. ${name.split(" ")[2]}! Your son/daughter ${name.split(" ")[0]} ${name.split(" ")[1]} is in danger of dropping the subject due to many absences. Have a good day.`
            : `Greetings Mr/Ms. ${name.split(" ")[2]}! Your son/daughter ${name.split(" ")[0]} ${name.split(" ")[1]} is regularly attending his/her classes. You should be proud. Have a good day.`
          };

          if (fail)
        //   console.log('HOLY SHIT ', data);
          return await transporter.sendMail(mailOptions);
        // return await this.db.collection('custom').update({_id : ObjectId(id)}, {$set : {msg : data.msg, name : data.name}});
        // return await this.db.collection('custom').update({_id : ObjectId(id)}, {msg : data.msg});
        // return {id, msg, name};
    }

    async remove(id) {

    }
}

export default function setupBankService(db) {
    return function() {
        const before = {};
        const after = {};
        this.use('/custom', new CustomService(db));
        // const service = this.service('/custom');
        // service.before(before);
        // service.after(after);
    }
}
