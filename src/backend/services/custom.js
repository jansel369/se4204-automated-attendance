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
        // return "finding get?";
    }
            //account number
    async get(id, params) {
        // return await Bank.requestAccountDetails(id);
    }

    async patch(id, data, params) {
        // const {employer, employee, amount} = data;
        // return await Bank.initiatePayment(employer, employee, amount);
    }

    async update(id, data, params) {

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
