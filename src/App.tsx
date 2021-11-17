import DScanTextField from "./DScanTextField/DScanTextField";
import SiteButton from "./SiteButton/SiteButton";
import { useEffect, useState } from "react";
import {
  getSiteResult,
  GroupedData,
  mapDScanReadout,
  SiteCode,
} from "./helpers";
import DScanData from "./DScanData/DScanData";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

function App() {
  const [dScanReadout, setDScanReadout] = useState<string>("");
  const [groupedData, setGroupedData] = useState<GroupedData>({
    ships: {},
    wrecks: {},
  });
  const [site, setSite] = useState<SiteCode | "">("");
  const [currentSiteResult, setCurrentSiteResult] = useState<string>("");

  const handleOnSitePick = (site: SiteCode) => {
    setSite(site);
  };

  const handleDScanReadoutChange = (newDScanReadout: string) =>
    setDScanReadout(newDScanReadout);

  useEffect(() => {
    setGroupedData(mapDScanReadout(dScanReadout));
  }, [dScanReadout]);

  useEffect(() => {
    if (!site) {
      return;
    }

    const result = getSiteResult(groupedData, site);
    setCurrentSiteResult(result);
  }, [groupedData, site]);

  // TODO: current site selected, result printed in correct manner, ships results, prepare d-scan config

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "70vh",
          marginTop: "15vh",
          padding: "20px",
          borderRadius: "6px",
          display: "grid",
          gridTemplateColumns: "auto",
          gridGap: "10px",
        }}
      >
        <DScanTextField onDScanReadoutChange={handleDScanReadoutChange} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "10px",
          }}
        >
          <SiteButton
            site="tpph"
            onSitePick={handleOnSitePick}
            currentSite={site}
          >
            TPPH
          </SiteButton>

          <SiteButton
            site="nrf"
            onSitePick={handleOnSitePick}
            currentSite={site}
          >
            NRF
          </SiteButton>

          <SiteButton
            site="tcrc"
            onSitePick={handleOnSitePick}
            currentSite={site}
          >
            TCRC
          </SiteButton>
        </Box>

        <DScanData groupedData={groupedData} />

        {currentSiteResult}
      </Box>
    </Container>
  );
}

export default App;
