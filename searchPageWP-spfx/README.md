## external-sharing

## Summary
This Development shows how to create Search Page using `Angular elements` and `@microsoft/sp-dialog` webpart

## Solution

Solution|Author(s)
--------|---------
Search Page | PzProjects

## Version history

Version|Date|Comments
-------|----|--------
1.0|Novermber 19, 2020|Initial version

## Technology versions used

* Node.js- v10.22.0
* Gulp-
  CLI version: 7.0.7
  Local version: 7.0.7
* Npm- 6.14.8

## Set your environment

Please follow this guide in order to set up your SharePoint Framework development environment:
[SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## Preparations


## Debug

- First you need to set the url of the required document library:
  Go to "serve.json" under the folder "config" and change "pageUrl" to the required document library url
  This step is not mandatory when the relevent document library remain the same!
- Move to folder where this readme exists
- In the command line run:
  - `npm install`
  - `gulp trust-dev-cert`
  - `gulp serve`

## Deploy

- Move to folder where this readme exists
- In the command line run:
  - `gulp serve --nobrowser`
  - `gulp clean`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Upload .sppkg file from sharepoint\solution to your tenant App Catalog
  E.g.: https://<tenant>.sharepoint.com/sites/AppCatalog/AppCatalog


## Features

This project contains Angular Elements and Sharepoint REST API calls that illustrates next features:
* Get all profiles from the Sharepoint
  [Sharepoint REST API](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/complete-basic-operations-using-sharepoint-rest-endpoints)
*Search the profile by name,last name,fullname and search by department and by location
* Angular 7
* Using `@angular-material` This guide explains how to setup your Angular project to begin using Angular Material. It includes information on prerequisites, installing Angular Material, and optionally displaying a sample material component in your application to verify your setup.
  [Angular Material](https://material.angular.io/guide/getting-started)
