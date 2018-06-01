export interface Cafe {
  name: string;
  location: Location;
  placeId: string;
  openingHours: any;
}

export interface Location {
  latitude: number;
  longitude: number;
}
