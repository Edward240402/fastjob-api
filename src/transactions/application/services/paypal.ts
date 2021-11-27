
export class Paypal {
  public message: string;

  public sendPayment(total:number) {
    this.message = `The transaction is starting to your Paypal account s/.${total}`;
    return this.message;
  }

}