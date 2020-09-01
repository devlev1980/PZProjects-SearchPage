import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'SearchPageSpfxWebPartStrings';

/** Include Angular Elements JS and Style */
import 'search-page-wp/dist/searchPageWP/bundle.js';
require('../../../node_modules/search-page-wp/dist/searchPageWP/styles.css');

export interface ISearchPageSpfxWebPartProps {
  description: string;
}

export default class SearchPageSpfxWebPart extends BaseClientSideWebPart<ISearchPageSpfxWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<app-search-page-spfx-web-part description="${ this.properties.description }"></app-search-page-spfx-web-part>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
