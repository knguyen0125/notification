import { Injectable, Provider, Logger } from '@nestjs/common';
import * as glob from 'glob';
import { EmailVariable } from './email-variable.interface';

@Injectable()
export class EmailVariableProvider {
  private variables: { [k: string]: EmailVariable } = {};

  constructor(private logger: Logger) {
    this.logger.setContext('EmailVariableProvider');
  }

  async initialize() {
    this.logger.log('Initializing EmailVariableProvider');
    return new Promise((resolve, reject) => {
      glob(
        '/variables/**.variable.+(js|ts)',
        { root: __dirname },
        async (err: Error, files: string[]) => {
          if (err) {
            reject(err);
          }

          await Promise.all(
            files.map(file =>
              import(file).then(module =>
                this.registerVariable(new module.default()),
              ),
            ),
          );

          this.logger.log(
            `Registered ${Object.keys(this.variables).length} variables`,
          );
          resolve();
        },
      );
    });
  }

  getVariables() {
    return this.variables;
  }

  hasVariable(variableName: string) {
    return !!this.variables[variableName];
  }

  registerVariable(variable: EmailVariable) {
    this.variables[variable.name] = variable;
  }
}

export function createEmailVariableProviderAsync(): Provider {
  return {
    provide: EmailVariableProvider,
    useFactory: async (logger: Logger) => {
      const emailService = new EmailVariableProvider(logger);
      await emailService.initialize();
      return emailService;
    },
    inject: [Logger],
  };
}
