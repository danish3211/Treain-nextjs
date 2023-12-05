import stationsData from '../path/to/stations.json';

const stationCodeToName = {};
stationsData.forEach((station) => {
  stationCodeToName[station.code] = station.name;
});

export default stationCodeToName;
