import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, shareReplay} from 'rxjs/operators';
import {IProfile} from '../models/profile.model';
import {Observable} from 'rxjs';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class SharepointService {
  profiles: any[] = [];
  private cache$: Observable<any>;

  constructor(private http: HttpClient) {
  }

  getPofilesCached() {
    if (!this.cache$) {
      this.cache$ = this.getProfiles().pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.cache$;
  }

  private getProfiles() {
    const appweburl = `_api/search/query`;
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    const properties = 'UserName,EmployeeID,FirstName,WorkEmail,PictureUrl,LastName,WorkPhone,MobilePhone,Manager,OfficeNumber,Department,Office,JobTitle';
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
      UserName: '',
      EmployeeID: '',
      FirstName: '',
      LastName: '',
      PictureUrl: '',
      WorkPhone: '',
      MobilePhone: '',
      WorkEmail: '',
      FullName: '',
      Manager: '',
      ManagerDisplayName: '',
      Department: '',
      OfficeNumber: '',
      Office: '',
      JobTitle: '',
      workPhoneIconUrl: '',
      mobilePhoneIconUrl: '',
      emailIconUrl: '',
      departmentIconUrl: '',
      locationIconUrl: '',
      jobIconUrl: '',
      managerIconUrl: '',
      workADayIconUrl: '',
      menuIconUrl: ''
    };
    for (const property of profile) {
      profileObject.FullName = '';
      profileObject.workPhoneIconUrl = environment.workPhoneIcon;
      profileObject.mobilePhoneIconUrl = environment.mobilePhoneIcon;
      profileObject.emailIconUrl = environment.emailIcon;
      profileObject.jobIconUrl = environment.jobIcon;
      profileObject.departmentIconUrl = environment.departmentIcon;
      profileObject.locationIconUrl = environment.locationIcon;
      profileObject.managerIconUrl = environment.managerIcon;
      profileObject.workADayIconUrl = environment.workaDayIcon;
      profileObject.menuIconUrl = environment.menuIcon;
      profileObject[property.Key] = property.Value;
      if (profileObject[property.Key] === 'manager.DisplayName') {
        profileObject[property.Key] = 'ManagerDisplayName';
      }
    }
    return profileObject;
  }
}
