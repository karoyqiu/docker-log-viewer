import Stack from '@mui/material/Stack';
import React from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function LogFilters() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Stack direction="row" sx={{ m: 1, mb: 0 }}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} variant="standard" />}
          label="Since"
        // value={value}
        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
