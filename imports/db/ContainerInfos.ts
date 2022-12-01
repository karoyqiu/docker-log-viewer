import Docker from 'dockerode';
import { Mongo } from 'meteor/mongo';

export type ContainerInfo = Docker.ContainerInfo & {
  _id: string;
};
export const CONTAINERINFOS_COLLECTION = 'container-infos';
export const ContainerInfos = new Mongo.Collection<ContainerInfo>(CONTAINERINFOS_COLLECTION);
