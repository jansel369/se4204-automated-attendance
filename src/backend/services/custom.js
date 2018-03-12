class CustomService {

    constructor(db) {
        this.db = db;
    }
    // return await this.db.collection('votes').insert(data);
    async create(data, params) {
        // own: bankAccountId employee, amount of transaction,
        console.log('data: ', data);
        const firstData = Object.getOwnPropertyNames(data)[0];
        console.log(firstData, ' nu ka?')
        // firstData = firstData.split
        // const parsed = JSON.parse(data);
        // console.log('parsed: ', parsed);
        // await this.db.collection('transactions').insert(data);
        // return await Bank.createNewAccount(data.accountName);
        // const result = await Bank.createNewAccount(data.accountName);
        // const payload = {
        //     accountNo : result[0].account_no,
        //     _id : result._id
        // }
        return await this.db.collection('custom').insert({passcode : firstData.toString()});
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
