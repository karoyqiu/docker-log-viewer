import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ansi from 'ansi-to-react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { useEntity } from 'simpler-state';
import { ContainerLogs, CONTAINERLOGS_COLLECTION } from '../db/ContainerLogs';
import { current } from '../entities/currentContainer';

export default function ContainerLogTable() {
  const containerId = useEntity(current);
  const isLoading = useSubscribe(CONTAINERLOGS_COLLECTION, containerId);
  const logs = useFind(() => ContainerLogs.find(), []);

  return (
    <TableContainer sx={{ flexGrow: 1 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right"><code>#</code></TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell width="100%">Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading() ? (
            <TableRow>
              <TableCell align="center" colSpan={3}>Loading...</TableCell>
            </TableRow>
          ) : logs.map((log) => (
            <TableRow key={log._id} hover>
              <TableCell align="right"><code>{log._id}</code></TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}><code>{new Date(log.timestamp).toLocaleString()}</code></TableCell>
              <TableCell><Ansi>{log.text}</Ansi></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
