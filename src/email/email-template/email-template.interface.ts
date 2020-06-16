import { TagResolver } from '../types/tag-resolver.type';

export interface EmailTemplate {
  id: number;
  name: string;
  supportedLanguages?: string[];
  tags?: (string | TagResolver)[];
}
