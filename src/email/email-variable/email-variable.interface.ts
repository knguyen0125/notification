import { TagResolver } from '../types/tag-resolver.type';

export interface EmailVariable {
  id: number;
  name: string;
  resolver: TagResolver;
}
