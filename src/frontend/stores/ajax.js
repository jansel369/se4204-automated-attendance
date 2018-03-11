import 'regenerator-runtime/runtime';
import request from 'request-promise';

class UnionBank {
  constructor() {
    this.clientSecret = 'uP4hN0qJ0iE4fO6rI6mT6hK4iV3oP0rV6cS5iF0hT3iC5qA2fB';
    this.clientId = '13ce668a-afc7-4add-b0b3-8fe01cba4556';
    this.comissionBankAccount = '101890540024';
    this.commissionPercentage = 0.10; // 10%
  }

  async requestAccountDetails(accountNumber) {
    const options = {
      method: 'GET',
      url: `https://api-uat.unionbankph.com/hackathon/sb/accounts/${accountNumber}`,
      headers:
      { accept: 'application/json',
        'x-ibm-client-secret': this.clientSecret,
        'x-ibm-client-id': this.clientId },
      json: true,
    };
    // console.log(options, ' da options')
    return await request(options);
  }

  async createNewAccount(accountName) {
    const options = {
      method: 'POST',
      url: 'https://api-uat.unionbankph.com/hackathon/sb/test/accounts',
      body: {
        accountName: accountName,
      },
      headers:
      { accept: 'application/json',
        'Content-Type': 'application/json',
        'x-ibm-client-secret': this.clientSecret,
        'x-ibm-client-id': this.clientId },
      json: true,
    };
    // console.log(options, ' daa options')
    return await request(options);
  }

  async transferFunds(source, target, amount) {
    const options = {
      method: 'POST',
      url: 'https://api-uat.unionbankph.com/hackathon/sb/transfers/initiate',
      body: {
        'channel_id': 'GForce',
        'transaction_id': new Date().getTime().toString(),
        'source_account': source,
        'source_currency': 'PHP',
        'target_account': target,
        'target_currency': 'PHP',
        'amount': amount },
      headers:
      { accept: 'application/json',
        'Content-Type': 'application/json',
        'x-ibm-client-secret': this.clientSecret,
        'x-ibm-client-id': this.clientId },
      json: true,
    };

    return await request(options);
  }

  async initiatePayment(source, target, amount) {
    const actualAmount = amount - (this.commissionPercentage * amount);
    const commissionAmount = this.commissionPercentage * amount;

    await this.transferFunds(source, this.comissionBankAccount, commissionAmount);
    return await this.transferFunds(source, target, commissionAmount);
  }
}

const store = new UnionBank();
export default store;
