import Docker from 'dockerode';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { CONTAINERLOGS_COLLECTION } from '../ContainerLogs';
import StreamReader from './StreamReader';

type LogFilter = {
  since?: number | null;
  until?: number | null;
  follow?: boolean;
};

Meteor.publish(CONTAINERLOGS_COLLECTION, async function (containerId: string, filter?: LogFilter) {
  check(containerId, String);
  check(filter, {
    since: Match.Maybe(Number),
    until: Match.Maybe(Number),
    follow: Match.Maybe(Boolean),
  });

  if (containerId.length === 0) {
    this.ready();
    return;
  }

  const docker = new Docker();
  const container = docker.getContainer(containerId);
  const options: Docker.ContainerLogsOptions = {
    stdout: true,
    stderr: true,
    timestamps: true,
  };

  if (filter?.since) {
    options.since = Math.floor(filter.since / 1000);
  }

  if (filter?.until) {
    options.until = Math.ceil(filter.until / 1000);
  }

  if (!options.since && !options.until) {
    options.tail = 100;
  }

  let lastId = 0;

  const poll = async () => {
    const buffer = await container.logs({ ...options, follow: false });
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
