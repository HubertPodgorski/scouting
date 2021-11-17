const dScanColumnBreak = "\t";
const groupShips: Ship[] = [
  "Nestor",
  "Dominix",
  "Basilisk",
  "Rattlesnake",
  "Loki",
  "Vindicator",
  "Scimitar",
  "Kronos",
  "Eos",
];
const waveWrecks: Wreck[] = [
  "Deltole",
  "Mara",
  "Auga",
  "Arnon",
  "Uitra",
  "Vylade",
  "Eystur",
  "Outuni",
  "Intaki",
  "Niarja",
];
export type Wreck =
  | "Deltole"
  | "Mara"
  | "Auga"
  | "Arnon"
  | "Uitra"
  | "Vylade"
  | "Eystur"
  | "Outuni"
  | "Intaki"
  | "Niarja";

export type SiteCode = "tpph" | "tcrc" | "nrf";

export type Ship =
  | "Nestor"
  | "Dominix"
  | "Basilisk"
  | "Rattlesnake"
  | "Loki"
  | "Vindicator"
  | "Scimitar"
  | "Kronos"
  | "Eos";

const relevantResults = [...groupShips, ...waveWrecks];

// TODO: add drones later

export type GroupedData = {
  ships: { [shipName: string]: number };
  wrecks: { [wreckName: string]: number };
};

export const mapDScanReadout = (dScanReadout: string): GroupedData => {
  const rawData = dScanReadout.split(dScanColumnBreak);

  const groupedData: any = rawData.reduce(
    (data: any, currentResult: string): any => {
      const hasRelevantData = relevantResults.some((relevantResult: string) =>
        currentResult.includes(relevantResult)
      );
      if (!hasRelevantData) return data;

      const firstElement: string = currentResult.split(" ")[0] ?? "";

      let dataType: "ships" | "wrecks" | "" = "";

      const isShip = groupShips.some((shipName: string) =>
        shipName.includes(firstElement)
      );
      const isWreck = waveWrecks.some((wreckName: string) =>
        wreckName.includes(firstElement)
      );
      if (isShip) {
        dataType = "ships";
      } else if (isWreck) {
        dataType = "wrecks";
      }

      if (!dataType) {
        return data;
      }

      if (data[dataType] && data[dataType][firstElement]) {
        return {
          ...data,
          [dataType]: {
            ...data[dataType],
            [firstElement]: data[dataType][firstElement] + 1,
          },
        };
      } else {
        return {
          ...data,
          [dataType]: { ...data[dataType], [firstElement]: 1 },
        };
      }
    },
    { ships: {}, wrecks: {} }
  );

  return groupedData;
};

export const getSiteResult = (
  groupedData: GroupedData,
  site: SiteCode
): { reason: string; result: string } => {
  let data = {
    reason: "d-scan too empty or not relevant data",
    result: "Not enough data",
  };

  const wrecks = groupedData.wrecks;

  if (site === "tpph") {
    if (wrecks["Mara"] >= 1 || wrecks["Auga"] >= 3) {
      data = {
        reason: "Atleast one Mara OR atleast 3 Auga",
        result: "They are atleast in the second room",
      };

      if (wrecks["Deltole"] >= 2) {
        data = {
          reason: "(Atleast one Mara OR atleast 3 Auga) AND atleast 2 Deltole",
          result: "they are atleast in the third room, second wave",
        };

        if (wrecks["Arnon"] >= 1) {
          data = {
            reason:
              "(Atleast one Mara OR atleast 3 Auga) AND atleast 2 Deltole AND atleast one Arnon",
            result:
              "they are atleast in the middle of final wave, likely on tower",
          };
        }
      }
    }
  }

  if (site === "nrf") {
    if (wrecks["Uitra"] >= 1) {
      data = {
        reason: "Atleast one Uitra",
        result: "They are midway through the second wave",
      };

      if (wrecks["Mara"] > 2 || wrecks["Vylade"] > 2) {
        data = {
          reason:
            "Atleast one Uitra AND (more than 2 Mara OR more than 2 Vylade)",
          result: "They are minimum  on the third wave",
        };

        if (wrecks["Intaki"] >= 1 || wrecks["Eystur"] >= 1) {
          data = {
            reason:
              "Atleast one Uitra AND (more than 2 Mara OR more than 2 Vylade) AND (atealst on Intaki OR atleast one Eystur)",
            result: "They are on final wave",
          };
        }
      }
    }
  }

  if (site === "tcrc") {
    if (Object.keys(wrecks).length <= 0) {
      data = {
        reason: "No wrecks",
        result: "They just entered",
      };
    }

    if (wrecks["Deltole"] >= 5 || wrecks["Outuni"] >= 2) {
      data = {
        reason: "Atleast 5 Deltole OR atleast 2 Outuni",
        result: "They are propably on tower",
      };
    }

    if (wrecks["Niarja"] >= 2) {
      data = {
        reason: "(Atleast 5 Deltole OR atleast 2 Outuni) AND atleast 2 Niarja",
        result: "Propably Full shield",
      };

      if (wrecks["Niarja"] >= 3) {
        data = {
          reason:
            "(Atleast 5 Deltole OR atleast 2 Outuni) AND atleast 3 Niarja",
          result: "Propably No shield",
        };

        if (wrecks["Niarja"] >= 4) {
          data = {
            reason:
              "(Atleast 5 Deltole OR atleast 2 Outuni) AND atleast 4 Niarja",
            result: "Propably No armor",
          };
        }
      }
    }
  }

  return data;
};

export const getFleetEstimate = (groupedData: GroupedData): string => {
  const ships = groupedData.ships;
  if (ships["Eos"] >= 1 || ships["Nestor"] > 1)
    return "Can be TDF or Chinese fleet - check names";

  if (ships["Dominix"] >= 3)
    return "Atleast 3 Dominixes - can be Dominix Boxer";

  if (ships["Basilisk"] >= 2 || ships["Rattlesnake"] >= 3)
    return "Atleast 2 Basi or 3 Rattlesnakes = can be NGA - check Cyrillic names";

  if (ships["loki"] >= 2) return "Atleast 2 Lokis - can be Candeez";

  return "Sorry - cannot tell what fleet is running";
};
