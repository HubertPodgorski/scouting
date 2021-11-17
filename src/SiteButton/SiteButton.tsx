import { Button } from "@mui/material";
import React, { ReactNode } from "react";
import { SiteCode } from "../helpers";

interface Props {
  onSitePick: (site: SiteCode) => void;
  site: SiteCode;
  children: ReactNode;
  currentSite: string;
}

const SiteButton = ({ onSitePick, site, children, currentSite }: Props) => (
  <Button
    onClick={() => onSitePick(site)}
    variant={currentSite === site ? "contained" : "outlined"}
  >
    {children}
  </Button>
);

export default SiteButton;
