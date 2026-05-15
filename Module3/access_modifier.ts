// access >> modify
//protected diye child class e data pathano jabe
class BankAccount {
  readonly userId: number;
  public userName: string;
  protected _userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this._userBalance = userBalance;
  }

  private addBalance(balance: number) {
    this._userBalance = this._userBalance + balance;
  }
  showbalance(){
    console.log(`${this._userBalance}`)
  }
}
class StudentBankAccount extends BankAccount {
  test() {
    console.log(this._userBalance)
  }
}

const mezbaBhaiAccount = new BankAccount(111, "Mezba", 20);
mezbaBhaiAccount.showbalance()