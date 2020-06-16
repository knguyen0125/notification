import { EmailVariable } from '../email-variable.interface';

export default class Mailchimp implements EmailVariable {
  id = 1;
  name = 'MAILCHIMP';
  resolver = () => 'Mandrill';
}
