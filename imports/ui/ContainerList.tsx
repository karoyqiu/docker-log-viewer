import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { ContainerInfos, CONTAINERINFOS_COLLECTION } from '../db/ContainerInfos';

export default function ContainerList() {
  const isLoading = useSubscribe(CONTAINERINFOS_COLLECTION);
  const containers = useFind(() => ContainerInfos.find({}, { sort: { name: 1 } }), []);

  return (
    <List
      component="nav"
      subheader={(
        <ListSubheader component="div">
          Containers
        </ListSubheader>
      )}
    >
      {isLoading() ? (
        <ListItemButton>
          <ListItemText primary="Loading..." />
        </ListItemButton>
      ) : containers.map((container) => (
        <ListItemButton key={container._id}>
          <ListItemText primary={container.name} />
        </ListItemButton>
      ))}
    </List>
  );
}
