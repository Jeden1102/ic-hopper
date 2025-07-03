export type BilkomStation = {
  type: string;
  id: string;
  name: string;
  arrivalDate: string | null;
  realArrivalDate: string | null;
  departureDate: string | null;
  realDepartureDate: string | null;
  duration: number;
  distance: number | null;
  sequenceIndex: number | null;
  routeIndex: number | null;
  platform: string | null;
  track: string | null;
  extId: string;
  geoPoint: {
    lat: number;
    lon: number;
  };
  stopTimeString: string;
  platformAndTrack: string | null;
};

export type BilkomResponse = {
  stations: BilkomStation[];
};

export type StationShort = {
  id: string;
  name: string;
};
