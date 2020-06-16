import { Injectable, Logger, Provider } from '@nestjs/common';
import * as glob from 'glob';
import * as _ from 'lodash';
import { EmailTemplate } from './email-template.interface';
import { EmailVariableService } from '../email-variable/email-variable.service';

@Injectable()
export class EmailTemplateProvider {
  private templates: { [k: string]: EmailTemplate } = {};

  constructor(
    private logger: Logger,
    private emailVariableService: EmailVariableService,
  ) {
    this.logger.setContext('EmailTemplateProvider');
  }

  async initialize() {
    this.logger.log('Initializing');
    return new Promise((resolve, reject) => {
      glob(
        '/templates/**.template.+(js|ts)',
        { root: __dirname },
        async (err: Error, files: string[]) => {
          if (err) {
            reject(err);
          }

          await Promise.all(
            files.map(file =>
              import(file).then(module =>
                this.registerTemplate(new module.default()),
              ),
            ),
          );

          this.logger.log(
            `Registered ${Object.keys(this.templates).length / 2} templates`,
          );
          resolve();
        },
      );
    });
  }

  private fillTemplateWithDefault(template: EmailTemplate) {
    const clonedTemplate = _.clone(template);
    if (!template.supportedLanguages) {
      clonedTemplate.supportedLanguages = ['en'];
    }

    if (!template.tags) {
      clonedTemplate.tags = [];
    }

    return clonedTemplate;
  }

  private isTemplateValid(template: EmailTemplate) {
    let isValid = true;
    const undefinedTags = [];

    template.tags!.forEach(tag => {
      if (typeof tag === 'string') {
        const isTagValid = this.emailVariableService.hasVariable(tag);

        if (!isTagValid) {
          isValid = false;
          undefinedTags.push(tag);
        }
      }
    });

    if (!_.isEmpty(undefinedTags)) {
      this.logger.warn(
        `Template ${
          template.name
        } has the following undefined tags: ${undefinedTags.join(', ')}`,
      );
    }
    return isValid;
  }

  registerTemplate(template: EmailTemplate) {
    this.logger.verbose(`Registering template ${template.name}`);
    const templateWithDefault = this.fillTemplateWithDefault(template);

    if (!this.isTemplateValid(templateWithDefault)) {
      this.logger.warn(`Template ${template.name} will not be registered.`);
      return;
    }

    this.templates[template.id] = templateWithDefault;
    this.templates[template.name.toLowerCase()] = templateWithDefault;
  }

  getTemplates() {
    return this.templates;
  }

  getTemplateById(id: number) {
    return this.templates[id];
  }

  getTemplateByName(name: string) {
    return this.templates[name.toLowerCase()];
  }
}

export function createEmailTemplateProviderAsync(): Provider {
  return {
    provide: EmailTemplateProvider,
    useFactory: async (
      logger: Logger,
      emailVariableService: EmailVariableService,
    ) => {
      const emailService = new EmailTemplateProvider(
        logger,
        emailVariableService,
      );
      await emailService.initialize();
      return emailService;
    },
    inject: [Logger, EmailVariableService],
  };
}
