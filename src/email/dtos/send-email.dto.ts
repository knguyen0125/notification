import { Metadata } from '../types/metadata.type';

export interface SendEmailDto {
  // Needed to include one of these
  id?: number;
  name?: string;

  language: string;

  metadata?: Metadata;
}
