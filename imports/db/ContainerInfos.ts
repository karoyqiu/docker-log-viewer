import { Mongo } from 'meteor/mongo';

export type ContainerInfo = {
  _id: string;
  name: string;
};
export const CONTAINERINFOS_COLLECTION = 'container-infos';
export const ContainerInfos = new Mongo.Collection<ContainerInfo>(CONTAINERINFOS_COLLECTION);
