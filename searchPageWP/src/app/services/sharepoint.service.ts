import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {IProfile} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class SharepointService {
  profiles: any[] = [];

  constructor(private http: HttpClient) {
  }

  getProfiles() {
    const appweburl = `_api/search/query`;
    // const properties = 'Office,Id,FirstName,LastName,MobilePhone,WorkPhone,AccountName,Department,JobTitle,PictureURL,WorkEmail,WorkId,EmployeeID'
    const properties = 'EmployeeID,FirstName,WorkEmail,PictureUrl,LastName,WorkPhone,MobilePhone,manager.DisplayName,OfficeNumber,Department,Office';
    const httpURL = `${environment.apiUrl}${appweburl}`;
    const httpParams = new HttpParams()
      .set('queryText', `'*'`)
      .set('sourceid', `'${environment.sourceId}'`)
      .set('selectproperties', `'${properties}'`)
      .set('RowLimit', `'10000'`);
    return this.http.get(httpURL, {params: httpParams})
      .pipe(
        map((res: any) => res.PrimaryQueryResult.RelevantResults.Table.Rows),
        map(item => item.map(el => el.Cells)),
        map(profiles => {
            let mappedProfile: IProfile;
            for (const profile of profiles) {
              mappedProfile = this.mapKeyToValue(profile);
              if (mappedProfile.EmployeeID !== null && mappedProfile.FirstName !== '') {
                mappedProfile.FullName = mappedProfile.FirstName + ' ' + mappedProfile.LastName;
                this.profiles.push(mappedProfile);
                profiles = this.profiles;
              }
            }

            return profiles;
          }
        ));

  }

  mapKeyToValue(profile: any) {
    const profileObject: IProfile = {
      EmployeeID: '',
      FirstName: '',
      LastName: '',
      PictureUrl: '',
      WorkPhone: '',
      MobilePhone: '',
      WorkEmail: '',
      FullName: '',
      ManagerDisplayName: '',
      Department: '',
      OfficeNumber: '',
      Office: ''
    };
    for (const property of profile) {
      profileObject.FullName = '';
      profileObject[property.Key] = property.Value;
      if (profileObject[property.Key] === 'manager.DisplayName') {
        console.log('yes')
        profileObject[property.Key] = 'ManagerDisplayName';
      }
    }
    return profileObject;
  }
}
