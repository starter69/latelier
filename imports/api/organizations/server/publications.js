import { Meteor } from "meteor/meteor";
import { publishComposite } from "meteor/reywood:publish-composite";

import { Organizations } from "../organizations";

Meteor.publish("organizations", function organizations() {
  var userId = Meteor.userId();
  var query = {$or: [{members: userId}, {isPublic: true}]};
  return Organizations.find(query);
});


Meteor.publish("organization", function organization(organizationId) {
  var userId = Meteor.userId();
  var query = {_id: organizationId};
  return Organizations.find(query);
});