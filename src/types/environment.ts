export type Environment = {
  id: string;
  name: string;
  version: string;
  deployStatus: 'up-to-date' | 'upgrading' | 'failed';
  type: 'staging' | 'production' | 'lts';
};