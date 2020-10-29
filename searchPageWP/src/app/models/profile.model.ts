export interface IProfile {
  UserName: string;
  EmployeeID: string;
  FirstName: string;
  LastName: string;
  WorkPhone: string;
  MobilePhone: string;
  WorkEmail: string;
  PictureUrl: string;
  FullName: string;
  Manager: string;
  ManagerDisplayName: string;
  Office: string;
  OfficeNumber: string;
  Department: string;
  JobTitle: string;
  Rank?: number;
  workPhoneIconUrl?: string;
  mobilePhoneIconUrl?: string;
  emailIconUrl?: string;
  jobIconUrl?: string;
  departmentIconUrl?: string;
  locationIconUrl?: string;
  managerIconUrl?: string;
  workADayIconUrl?: string;
  menuIconUrl?: string;
  FirstNameRankOnStart?: number;
  FirstNameRankNotStart?: number;
  LastNameRankOnStart?: number;
  LastNameRankNotOnStart?: number;

}
