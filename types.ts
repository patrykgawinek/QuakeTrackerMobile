export interface TimeInterval {
  since: Date;
  to: Date;
}

export interface CircleDistance {
  latitude: number;
  longitude: number;
  distance: number;
}

export interface MagnitudeRange {
  minimum: number;
  maximum: number;
}

export enum AlertLevel {
  "All",
  "Green",
  "Yellow",
  "Orange",
  "Red",
}

/* API Related interfaces */
export interface Metadata {
  generated: number;
  url: string;
  title: string;
  status: number;
  api: string;
  count: number;
}

export interface Properties {
  mag: number;
  place: string;
  time: any;
  updated: any;
  tz?: any;
  url: string;
  detail: string;
  felt?: number;
  cdi?: number;
  mmi?: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst?: number;
  dmin?: number;
  rms: number;
  gap?: number;
  magType: string;
  type: string;
  title: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  id: string;
}

export interface Result {
  type: string;
  metadata: Metadata;
  features: Feature[];
  bbox: number[];
}
