import { Module, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailTemplateService } from './email-template/email-template.service';
import { createEmailTemplateProviderAsync } from './email-template/email-template.provider';
import { EmailController } from './email.controller';
import { EmailVariableService } from './email-variable/email-variable.service';
import { createEmailVariableProviderAsync } from './email-variable/email-variable.provider';

@Module({
  providers: [
    Logger,
    createEmailVariableProviderAsync(),
    createEmailTemplateProviderAsync(),
    EmailTemplateService,
    EmailService,
    EmailVariableService,
  ],
  controllers: [EmailController],
})
export class EmailModule {}
