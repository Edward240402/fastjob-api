export class NotificationEmail {
  public message: string;
  public sendMessageEmail(total:number) {
    console.log(`Sending message on user account email, the transaction that will be made is s/.${total}`)
  }
}