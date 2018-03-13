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
        const results = await this.db.collection('custom').find().toArray();
        const theOne = results.find(res => res._id.toString() === id);
        // console.log(theOne, ' da right one!');
        return theOne;
    }

    async patch(id, data, params) {
        // const {employer, employee, amount} = data;
        // return await Bank.initiatePayment(employer, employee, amount);
        const { email, name, passcode } = data;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'brentuniverysity@gmail.com',
              pass: 'verystrongpassword'
            }
          });
          
          const mailOptions = {
            from: 'brentuniverysity@gmail.com',
            to: email,
            subject: 'Brent University Student Passcode',
            text: `Welcome to Brent University ${name}! Your generated passcode is ${passcode}`
          };
          
          return await transporter.sendMail(mailOptions);
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
    }

    async update(id, data, params) {
        const { name, msg } = data;
        return await this.db.collection('custom').update({_id : ObjectId(id)}, {$set : {msg : data.msg, name : data.name}});
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
