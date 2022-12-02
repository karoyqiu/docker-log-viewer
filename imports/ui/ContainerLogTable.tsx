import MuiTable, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ansi from 'ansi-to-react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { useEntity } from 'simpler-state';
import { ContainerLog, ContainerLogs, CONTAINERLOGS_COLLECTION } from '../db/ContainerLogs';
import currentContainer from '../entities/currentContainer';
import sinceEntity from '../entities/since';
import untilEntity from '../entities/until';

const Scroller = React.forwardRef<HTMLDivElement>(
  (props, ref) => <TableContainer {...props} ref={ref} sx={{ flexGrow: 1 }} />,
);
const Body = React.forwardRef<HTMLTableSectionElement>(
  (props, ref) => <TableBody {...props} ref={ref} />,
);

function Table(props: TableProps) {
  return <MuiTable {...props} sx={{ borderCollapse: 'separate' }} />;
}

function Header() {
  return (
    <TableRow sx={{ backgroundColor: 'background.default', borderCollapse: 'separate' }}>
      <TableCell align="right"><code>#</code></TableCell>
      <TableCell align="right">Time</TableCell>
      <TableCell width="100%">Log</TableCell>
    </TableRow>
  );
}

function Row(_index: number, log: ContainerLog) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, timestamp, text } = log;

  return (
    <>
      <TableCell align="right"><code>{_id}</code></TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}><code>{new Date(timestamp).toLocaleString()}</code></TableCell>
      <TableCell><Ansi>{text}</Ansi></TableCell>
    </>
  );
}

export default function ContainerLogTable() {
  const containerId = useEntity(currentContainer);
  const since = useEntity(sinceEntity);
  const until = useEntity(untilEntity);
  useSubscribe(CONTAINERLOGS_COLLECTION, containerId, {
    since: since?.valueOf(),
    until: until?.valueOf(),
  });
  const logs = useFind(() => ContainerLogs.find(), []);

  return (
    <TableVirtuoso
      data={logs}
      components={{
        Scroller,
        Table,
        TableHead,
        TableRow,
        TableBody: Body,
      }}
      fixedHeaderContent={Header}
      itemContent={Row}
    />
  );
}
