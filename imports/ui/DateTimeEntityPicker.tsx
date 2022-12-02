import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';
import { Entity, useEntity } from 'simpler-state';

type DateTimeEntityPickerProps = {
  entity: Entity<Date | null>;
  label: string;
};

export default function DateTimeEntityPicker(props: DateTimeEntityPickerProps) {
  const { label, entity } = props;
  const value = useEntity(entity);

  return (
    <DateTimePicker
      renderInput={(ps) => <TextField {...ps} variant="standard" />}
      InputProps={{
        startAdornment: (
          <IconButton
            onClick={() => entity.set(null)}
            disabled={!value}
            style={{ order: 1 }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
      InputAdornmentProps={{
        position: 'end',
        style: { order: 2, marginLeft: 0 },
      }}
      label={label}
      value={value}
      onChange={(newValue) => {
        entity.set(newValue);
      }}
    />
  );
}
