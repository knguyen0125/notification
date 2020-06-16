import { Metadata } from './metadata.type';

export type TagResolver = (metadata?: Metadata) => any | Promise<any>;
