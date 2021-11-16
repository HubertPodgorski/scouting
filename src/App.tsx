import DScanTextField from './DScanTextField/DScanTextField';
import SiteButton from './SiteButton/SiteButton';
import { useEffect, useState } from 'react';
import { getSiteResult, GrouppedData, mapDScanReadout } from './helpers';
import DScanData from './DScanData/DScanData';
import style from './App.module.scss'

function App() {
  const [dScanReadout, setDScanReadout] = useState<string>('');
  const [grouppedData, setGrouppedData] = useState<GrouppedData>({ships: {}, wrecks: {}});
  const [site, setSite] = useState<string>('');
  const [currentSiteResult, setCurrentSiteResult] = useState<string>('');

  const handleOnSitePick = (site: string) => {
    setSite(site)
  }

  console.log(dScanReadout);

  const handleDScanReadoutChange = (newDScanReadout: string) => setDScanReadout(newDScanReadout);

  useEffect(() => {setGrouppedData(mapDScanReadout(dScanReadout))}, [dScanReadout])

  useEffect(() => {
    if (!site) {
      return
    }

    const result = getSiteResult(grouppedData, site);
    setCurrentSiteResult(result);

    console.log("SITE RESULT ", result)
  }, [grouppedData, site]);


  // TODO: current site selected, result printed in correct manner, ships results, prepare d-scan config
  return (
    <div className={style.wrapper}>
      <DScanTextField onDScanReadoutChange={handleDScanReadoutChange} />

      <SiteButton site='tpph' onSitePick={handleOnSitePick}>TPPH</SiteButton>

      <DScanData grouppedData={grouppedData} />

      {currentSiteResult}
    </div>
  );
}

export default App;
