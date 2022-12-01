import Docker from 'dockerode';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { CONTAINERLOGS_COLLECTION } from '../ContainerLogs';
import StreamReader from './StreamReader';

Meteor.publish(CONTAINERLOGS_COLLECTION, async function (containerId: string) {
  check(containerId, String);

  if (containerId.length === 0) {
    this.ready();
    return;
  }

  const docker = new Docker();
  const container = docker.getContainer(containerId);
  let lastId = 0;

  const poll = async () => {
    const buffer = await container.logs({
      stdout: true,
      stderr: true,
      details: true,
      tail: 100,
      timestamps: true,
    });
    const reader = new StreamReader(buffer);
    let i = 0;

    for (; !reader.atEnd; i++) {
      const log = reader.next();

      if (i < lastId) {
        this.changed(CONTAINERLOGS_COLLECTION, `${i}`, log);
      } else {
        this.added(CONTAINERLOGS_COLLECTION, `${i}`, log);
      }
    }

    for (let j = i; j < lastId; j++) {
      this.removed(CONTAINERLOGS_COLLECTION, `${j}`);
    }

    lastId = i;
  };

  await poll();
  this.ready();

  // const interval = Meteor.setInterval(poll, 10000);
  // this.onStop = () => Meteor.clearInterval(interval);
});
