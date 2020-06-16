import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailDto } from './dtos/send-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
