export interface IEmployee {
  id: string;
  first_name: string;
  last_name: string;
  work_phone: string;
  cell_phone: string;
  department: string;
  email: string;
  job: string;
  location: ILocation;
}

interface ILocation {
  room: number;
  address: string;
}
