import React, { ChangeEventHandler, useState } from 'react';
import { TextField } from '@mui/material';


interface Props {
    onDScanReadoutChange: (newDScanReadout: string) => void;
}

const DScanTextField = ({onDScanReadoutChange}: Props) => {
    const [dScanReadout, setDScanReadout] = useState<string>('');

    const handleOnChange = (e: any) => onDScanReadoutChange(e.target.value);

    return <TextField
    id="outlined-multiline-static"
    label="Multiline"
    multiline
    rows={4}
    defaultValue="Default Value"
    onChange={handleOnChange}
  />
}

export default DScanTextField