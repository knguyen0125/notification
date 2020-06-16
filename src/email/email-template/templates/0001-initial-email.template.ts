import { EmailTemplate } from '../email-template.interface';

export default class InitialEmailTemplate implements EmailTemplate {
  id = 1;
  name = '0001-email-template';
  tags = ['MAILCHIMP'];
}
