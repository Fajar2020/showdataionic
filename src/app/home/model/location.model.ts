export interface LocationModel{
  id: number;
  name: string;
  state: string;
  country: string;
  title: string;
  coord: {
      lon: number;
      lat: number;
  };
}
