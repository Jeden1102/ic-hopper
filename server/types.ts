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

type ICStation = {
  stacja: number;
  nazwaStacji: string;
  kodStacji: string;
  typStacji: string;
  numerStacji: string;
  peron: string;
  tor: string;
  dataPrzyjazdu: string;
  dataWyjazdu: string;
  dataPrzyjazduRzeczywista: string;
  dataWyjazduRzeczywista: string;
  rodzajKodStacji: string;
};

type ICRouteInfo = {
  kod: string;
  opis: string;
  stacjaDo?: string;
};

type ICRoute = {
  trasaPrzejazdu: ICStation[];
  trasaPrzejazduInformacje: ICRouteInfo[];
};

export type ICRouteResponse = {
  trasePrzejezdu: ICRoute;
  bledy: any[];
};

export type ICAvailableConnectionsResponse = {
  polaczenia: ICConnection[];
  bledy: any[];
};

export type ICConnection = {
  pociagi: ICTrain[];
  dataWyjazdu: string;
  dataPrzyjazdu: string;
  czasJazdy: number;
  czasNaPrzesiadke: number;
  czasNaPrzesiadke2: number;
  idPolaczenia: number;
};

type ICTrain = {
  stacjaWyjazdu: number;
  stacjaWyjazduMeta: number;
  stacjaPrzyjazdu: number;
  stacjaPrzyjazduMeta: number;
  nrPociagu: number;
  kategoriaPociagu: string;
  nazwaPociagu: string;
  dataWyjazdu: string;
  dataPrzyjazdu: string;
  czasJazdy: number;
  rodzajeMiejsc: number[];
  przedzialPlec: number[];
  uwagi: string[];
  typyMiejsc: number[];
  grm: number;
  informacjePasazerskie: any[];
  transfer: number;
  transferKomMiejska: number;
  transferKomunikaty: any[];
  typPojazdu: number;
  zestawieniaPociagowLink: string;
  wirtualnaWycieczkaLink: string;
};
