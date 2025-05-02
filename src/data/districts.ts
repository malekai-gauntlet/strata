export interface District {
  id: string;
  name: string;
  coordinates: [number, number];
  established?: boolean;
  region: string;
  studentCount: number;
}

export const districts: District[] = [
  {
    id: '227901',
    name: 'Austin ISD',
    coordinates: [-97.7431, 30.2672],
    established: true,
    region: 'Central Texas',
    studentCount: 75000
  },
  {
    id: '057905',
    name: 'Dallas ISD',
    coordinates: [-96.7970, 32.7767],
    established: false,
    region: 'North Texas',
    studentCount: 145000
  },
  {
    id: '101912',
    name: 'Houston ISD',
    coordinates: [-95.3698, 29.7604],
    established: false,
    region: 'Gulf Coast',
    studentCount: 196000
  }
  // Add more districts as needed
]; 