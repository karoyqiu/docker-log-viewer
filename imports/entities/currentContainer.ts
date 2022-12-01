import { entity } from 'simpler-state';

export const current = entity('');

export const set = (value: string) => current.set(value);
