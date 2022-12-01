import { Mongo } from 'meteor/mongo';

export type ContainerLog = {
  _id: string;
  timestamp: number;
  text: string;
};

export const CONTAINERLOGS_COLLECTION = 'container-logs';
export const ContainerLogs = new Mongo.Collection<ContainerLog>(CONTAINERLOGS_COLLECTION);
