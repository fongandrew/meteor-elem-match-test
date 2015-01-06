TestCollection = new Meteor.Collection('testCol');

Meteor.startup(function() {
  if (Meteor.isServer) {
    TestCollection.remove({});
    var _id1 = TestCollection.insert({
      list: [{values: [11, 7]}, {values: [1, 5]}]
    });
    var _id2 = TestCollection.insert({
      list: [{values: [11, 5]}]
    });
  }

  // Works on server, but not in client ...
  var result = TestCollection.findOne({
    list: {
      $elemMatch: {
        $and: [ {values: 5},
                {values: 11}  ]
      }
    }
  }) || {};

  if (result._id !== _id2) {
    console.warn("Expected " + _id2 + ", got " + result._id);
  }

  // Works on server, but not in client ...
  var result = TestCollection.findOne({
    list: {
      $elemMatch: {
        $or: [ {values: 1},
               {values: 100}  ]
      }
    }
  }) || {};

  if (result._id !== _id1) {
    console.warn("Expected " + _id1 + ", got " + result._id);
  }
});
