import { Injectable } from '@nestjs/common';
import { EmailVariableProvider } from './email-variable.provider';

@Injectable()
export class EmailVariableService {
  constructor(private emailVariableProvider: EmailVariableProvider) {}

  hasVariable(tag: string) {
    return this.emailVariableProvider.hasVariable(tag);
  }
}
