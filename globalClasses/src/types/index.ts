export interface MapOptions {
  [key: string]: () => void;
}

export type RegressionRow = number[];
export type ClassificationRow = [number, ...number[], string];

export type DataRow = RegressionRow | ClassificationRow;

export interface FeaturesInterface {
  [key: string]: number;
}

export interface RegressionDataObject {
  target?: number;
  features: FeaturesInterface;
  type: 'regression';
}
export interface ClassificationDataObject {
  target?: string;
  features: FeaturesInterface;
  type: 'classification';
}

export type DataObject = RegressionDataObject | ClassificationDataObject;

export interface DataSetConfig {
  data: DataRow[];
  features: string[];
  target: string;
  normalize?: boolean;
}