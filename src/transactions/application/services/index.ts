import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterTransactionValidator } from '../validators/register-transaction.validator';
import { RegisterTransactionsCommand } from '../commands/register-transaction.command';
import { RegisterTransactionResponseDto } from '../dtos/response/register-transaction-response.dto';
import { RegisterTransactionRequestDto } from '../dtos/request/register-transaction-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { Paypal } from './paypal';
import { NotificationApp } from './notificationApp';
import { NotificationEmail } from './notificationEmail';
import { NotificationSMS } from './notificationSMS';

@Injectable()
export class Index {
  constructor(
    private commandBus: CommandBus,
    private registerTransactionValidator: RegisterTransactionValidator
  ) {}

  async register(registerTransactionRequestDto: RegisterTransactionRequestDto): Promise<Result<AppNotification, RegisterTransactionResponseDto>>{
    const notification: AppNotification = await this.registerTransactionValidator.validate(registerTransactionRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }

    if(registerTransactionRequestDto.typeOfAccount==="VIP") {

   const paypal = new Paypal();
   paypal.sendPayment(registerTransactionRequestDto.payment);

   const notification = new NotificationApp();
   notification.sendMessageApp(registerTransactionRequestDto.payment);

   const notificationEmail= new NotificationEmail();
   notificationEmail.sendMessageEmail(registerTransactionRequestDto.payment);

   const notificationSMS= new NotificationSMS();
   notificationSMS.sendMessageSMS(registerTransactionRequestDto.payment);


      const registerTransactionCommand: RegisterTransactionsCommand = new RegisterTransactionsCommand(
        registerTransactionRequestDto.contractId,
        registerTransactionRequestDto.employeeId,
        registerTransactionRequestDto.contractorId,
        registerTransactionRequestDto.payment,
        registerTransactionRequestDto.typeOfAccount,
        0.0,
        registerTransactionRequestDto.payment,
      );


      const transactionId = await this.commandBus.execute(registerTransactionCommand);
      const registerTransactionResponseDto: RegisterTransactionResponseDto = new RegisterTransactionResponseDto(
        transactionId,
        registerTransactionRequestDto.contractId,
        registerTransactionRequestDto.employeeId,
        registerTransactionRequestDto.contractorId,
        registerTransactionRequestDto.payment,
        registerTransactionRequestDto.typeOfAccount,
        0,
        registerTransactionRequestDto.payment,
      );


      return Result.ok(registerTransactionResponseDto);
    }

    if(registerTransactionRequestDto.typeOfAccount==="NORMAL"){

      const paypal = new Paypal();
      paypal.sendPayment(registerTransactionRequestDto.payment);

      const notification = new NotificationApp();
      notification.sendMessageApp(registerTransactionRequestDto.payment);

      const notificationEmail= new NotificationEmail();
      notificationEmail.sendMessageEmail(registerTransactionRequestDto.payment);

      const notificationSMS= new NotificationSMS();
      notificationSMS.sendMessageSMS(registerTransactionRequestDto.payment);

      const registerTransactionCommand: RegisterTransactionsCommand = new RegisterTransactionsCommand(
        registerTransactionRequestDto.contractId,
        registerTransactionRequestDto.employeeId,
        registerTransactionRequestDto.contractorId,
        registerTransactionRequestDto.payment,
        registerTransactionRequestDto.typeOfAccount,
       0.9,
        registerTransactionRequestDto.payment*0.9
      );


      const transactionId = await this.commandBus.execute(registerTransactionCommand);
      const registerTransactionResponseDto: RegisterTransactionResponseDto = new RegisterTransactionResponseDto(
        transactionId,
        registerTransactionRequestDto.contractId,
        registerTransactionRequestDto.employeeId,
        registerTransactionRequestDto.contractorId,
        registerTransactionRequestDto.payment,
        registerTransactionRequestDto.typeOfAccount,
        0.9,
        registerTransactionRequestDto.payment*0.9
      );
      return Result.ok(registerTransactionResponseDto);
    }

  }
}