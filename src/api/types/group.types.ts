import { Group } from '../models';
import { GROUP_TYPES } from '../constants';

export type Permission = typeof GROUP_TYPES[number];

export interface GroupSchema {
  name: string;
  permissions: Permission[];
}

export type GroupList = Record<string, Group>;
