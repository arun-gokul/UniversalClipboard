Snippets = new Mongo.Collection("snippets");
// new Clipboard('.btn');
if (Meteor.isServer) {

}

if (Meteor.isClient) {
  // counter starts at 0
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  Template.afterLogIn.events({
    "submit #new-snippet":function (event){
      event.preventDefault();
      var text = event.target.text.value;
      Meteor.call("addSnip",text);
      event.target.text.value = '';
    }
  });
  Template.snippet.events({
    "click .delete": function(){
      Meteor.call("delSnip",this._id);
    },
    "click .btn":function(){
      new Clipboard('.btn');
    }
  });
 Template.afterLogIn.helpers({
    "snippets": function(){
      return Snippets.find({owner: Meteor.userId()});
    }
  });
}

Meteor.methods({
  addSnip: function(text){
      Snippets.insert({
        text: text,
        owner: Meteor.userId(),
        createdAt: new Date()
      });

  },
  delSnip: function(id){
    Snippet.remove(id);
  }
});
