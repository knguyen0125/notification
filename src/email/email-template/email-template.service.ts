import { Injectable, Logger } from '@nestjs/common';
import { EmailTemplateProvider } from './email-template.provider';
import { SendEmailDto } from '../dtos/send-email.dto';

@Injectable()
export class EmailTemplateService {
    constructor(private logger: Logger, private emailTemplateProvider: EmailTemplateProvider) {
        this.logger.setContext('EmailTemplateService')
    }

    getTemplates() {
        return this.emailTemplateProvider.getTemplates();
    }

    getTemplate(sendEmailDto: SendEmailDto) {
        if (sendEmailDto.id) {
            return this.emailTemplateProvider.getTemplateById(sendEmailDto.id);
        }

        return this.emailTemplateProvider.getTemplateByName(sendEmailDto.name);
    }
}
