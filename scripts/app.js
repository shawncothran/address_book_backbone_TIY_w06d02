////////////////////////////////////////////////////////////////////////////////
//////////////////////////      Models      ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var Contact = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/shawncontactsapp'
});

var Contact = Backbone.Model.extend({
  urlRoot: 'http://tiny-starburst.herokuapp.com/collections/shawncontactsapp'
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////      Collections      //////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var Contacts = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/shawncontactsapp',
  model: Contact
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////      Views      ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var ContactFormView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  tagName: 'form',
  template: _.template($('#contactFormTemplate').html()),
  render: function() {
    $('.form').html(this.$el.html(this.template()));
  },

  events: {
    'click #saveBtn': 'save'
  },

  save: function(event) {
    event.preventDefault();
    var email = $('#email').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phoneNumber = $('#phoneNumber').val();
    var twitterHandle = $('#twitterHandle').val();
    var linkedin = $('#linkedin').val();
    if (
      email.length != '',
      firstName.length != '',
      phoneNumber > 999999999 && phoneNumber < 10000000000
    ) {
      this.model.set({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        twitterHandle: twitterHandle,
        linkedin: linkedin
      });
      this.model.save(null, {
        success: function(model, response, options) {
          console.log('success', model, response);
        }
      });
      var email = $('#email').val('');
      var firstName = $('#firstName').val('');
      var lastName = $('#lastName').val('');
      var phoneNumber = $('#phoneNumber').val('');
      var twitterHandle = $('#twitterHandle').val('');
      var linkedin = $('#linkedin').val('');
    } else {
      alert('Please complete required fields before hitting "Save"');
    }
  }
});

var ContactListView = Backbone.View.extend({
  template: _.template($('#contactListTemplate').html()),
  events: {
    'click .expand': 'expand'
  },

  render: function() {
    this.$el.html(this.template({
      contacts: this.collection.toJSON()
    }));
    return this;
  }
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////      Instantiations      ///////////////////////////
//////////////////////////////////////////////////////////////////////////////

var contactFormView = new ContactFormView({
  model: new Contact()
});

function buildList() {
  var collection = new Contacts();
  var listView = new ContactListView({
    collection: collection
  });

  collection.fetch({
    success: function() {
      listView.render();
      $('.list').html(listView.el);
    }
  });
};

buildList();
