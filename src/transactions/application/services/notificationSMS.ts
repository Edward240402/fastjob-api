export class NotificationSMS {
  public message: string;

  public sendMessageSMS(total:number) {
    console.log(`Sending message on user account email, the transaction that will be made is s/.${total}`)
  }

}