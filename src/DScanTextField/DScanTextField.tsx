import React from "react";
import { TextField } from "@mui/material";

interface Props {
  onDScanReadoutChange: (newDScanReadout: string) => void;
}

const DScanTextField = ({ onDScanReadoutChange }: Props) => {
  const handleOnChange = (e: any) => onDScanReadoutChange(e.target.value);

  return (
    <TextField
      sx={{ height: "100%" }}
      id="outlined-multiline-static"
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Put ur D-scan results here"
      onChange={handleOnChange}
    />
  );
};

export default DScanTextField;
