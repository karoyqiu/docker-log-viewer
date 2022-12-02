import Stack from '@mui/material/Stack';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import since from '../entities/since';
import until from '../entities/until';
import DateTimeEntityPicker from './DateTimeEntityPicker';

export default function LogFilters() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Stack direction="row" spacing={1} sx={{ m: 1, mb: 0 }}>
        <DateTimeEntityPicker
          label="Since"
          entity={since}
        />
        <DateTimeEntityPicker
          label="Until"
          entity={until}
        />
      </Stack>
    </LocalizationProvider>
  );
}
