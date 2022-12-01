import { Meteor } from 'meteor/meteor';
import Docker from 'dockerode';
import { CONTAINERINFOS_COLLECTION } from '../ContainerInfos';

Meteor.publish('container-infos', async function () {
  const docker = new Docker();
  let published: string[] = [];

  const poll = async () => {
    const containers = await docker.listContainers();
    const current: string[] = [];

    containers.forEach((container) => {
      const index = published.indexOf(container.Id);
      current.push(container.Id);

      if (index === -1) {
        this.added(CONTAINERINFOS_COLLECTION, container.Id, container);
      } else {
        this.changed(CONTAINERINFOS_COLLECTION, container.Id, container);
        published.splice(index, 1);
      }
    });

    published.forEach((id) => this.removed(CONTAINERINFOS_COLLECTION, id));
    published = current;
  };

  await poll();
  this.ready();

  const interval = Meteor.setInterval(poll, 10000);
  this.onStop = () => Meteor.clearInterval(interval);
});
