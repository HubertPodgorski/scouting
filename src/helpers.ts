const dScanColumnBreak = '\t'
const groupShips = ['Nestor', 'Dominix', 'Basilisk', 'Rattlesnake', 'Loki'];
const waveWrecks = ['Deltole', 'Mara', 'Auga', 'Arnon', 'Uitra', 'Vylade', 'Eystur', 'Outuni', 'Intaki', 'Niarja'];
const relevantResults = [...groupShips, ...waveWrecks];

// TODO: add drones later

export type GrouppedData = {ships: {[shipName: string]: number}, wrecks: {[wreckName: string]: number}}

export const mapDScanReadout = (dScanReadout: string): GrouppedData => {
    const rawData =  dScanReadout.split(dScanColumnBreak);
    console.log("rawData", rawData);

    const grouppedData: any = rawData.reduce((data: any, currentResult:  string): any => {
        const hasRelevantData = relevantResults.some((relevantResult: string) => currentResult.includes(relevantResult));
        if (!hasRelevantData) return data
        
        console.log("hasRelevantData ", hasRelevantData);
        console.log("currentResult", currentResult)

        const firstElement: string = currentResult.split(' ')[0] ?? '';

        console.log("firstElement ", firstElement);
        
        console.log("data", data);

        let dataType: 'ships' | 'wrecks' | '' = ''

        const isShip = groupShips.some((shipName: string) => shipName.includes(firstElement));
        const isWreck = waveWrecks.some((wreckName: string) => wreckName.includes(firstElement));
        if (isShip) {
            dataType = 'ships'
        } else if (isWreck) {
            dataType = 'wrecks'
        }

        if (!dataType) {
            return data
        }

        console.log("dataType", dataType);

        if (data[dataType] && data[dataType][firstElement]) {
            return {...data, [dataType]: {...data[dataType], [firstElement]: data[dataType][firstElement] + 1}}
        } else {
            return {...data, [dataType]: {...data[dataType], [firstElement]: 1}}
        }
    }, {ships: {}, wrecks: {}})

    console.log("grouppedData", grouppedData);

    return grouppedData
}

export const getSiteResult = (grouppedData: GrouppedData, site: string): string => {
    let result = ''

    const wrecks = grouppedData.wrecks;
    if (site === 'tpph') {
        if (wrecks['Mara'] >= 1 || wrecks['Auga'] >= 3) {
            result = 'They are atleast in the second room';
            
            if (wrecks['Deltole'] >= 2) {
                result = 'They are atleast in the third room, second wave';

                if (wrecks['Arnon'] >= 1) {
                    result = 'They are atleast in the middle of final wave, likely on tower';
                }
            }
        }
    }

    return result;
}