import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/fixtures.js';
import '../imports/startup/server/userPresence.js';
import '../imports/api/organizations/organizations.js';
import '../imports/api/organizations/server/publications.js';
import '../imports/api/projects/projects.js';
import '../imports/api/projects/server/publications.js';
import '../imports/api/users/server/publications.js';

import '../imports/api/projectGroups/projectGroups.js';
import '../imports/api/projectGroups/server/publications.js';
import '../imports/api/labels/server/publications.js';

if (Meteor.isServer) {
  Inject.rawBody("loader", Assets.getText('loader.html'));
}

Meteor.startup(() => {
  Meteor.call('organizations.fixOrphanProjects');
  Meteor.call('organizations.fixOrphanProjectGroups');
});
