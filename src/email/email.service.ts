import { Injectable, Logger } from '@nestjs/common';
import { EmailTemplateService } from './email-template/email-template.service';
import { SendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class EmailService {
    constructor(private logger: Logger, private emailTemplateService: EmailTemplateService) {
        this.logger.setContext('EmailService')
    }

    sendEmail(sendEmailDto: SendEmailDto) {
        const template = this.emailTemplateService.getTemplate(sendEmailDto);

        this.logger.log(template);
    }
}
