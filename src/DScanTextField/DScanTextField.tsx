import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  onDScanReadoutChange: (newDScanReadout: string) => void;
}

const DScanTextField = ({ onDScanReadoutChange }: Props) => {
  const [value, setValue] = useState("Put ur D-scan results here");
  const handleOnChange = (e: any) => {
    onDScanReadoutChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "10px" }}>
      <TextField
        sx={{ height: "100%" }}
        id="outlined-multiline-static"
        label="D-scan raw data"
        multiline
        rows={4}
        defaultValue="Put ur D-scan results here"
        onChange={handleOnChange}
        value={value}
      />

      <Button
        variant="outlined"
        onClick={async () => {
          const clipboardData = await navigator.clipboard.readText();
          setValue(clipboardData);
          onDScanReadoutChange(clipboardData);
        }}
      >
        Clear & Paste
      </Button>
    </Box>
  );
};

export default DScanTextField;
