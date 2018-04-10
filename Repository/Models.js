

var ConfigurationManager=require('../Utilities/Configuration/index');

var dbConfig = {
  client: 'mysql',
  connection: ConfigurationManager.getMySqlDbConfiguration()
};

dbConfig.connection.typeCast= function(field, next) {
    if (field.type == "BIT" && field.length == 1) {
        var bit = field.string();

        if(bit === null) 
            return false;
        else if(bit.charCodeAt(0)==1)
            return true;
        else
            return false;
    }

    // handle everything else as default
    return next();
}

var mongoose = require('mongoose');
mongoose.connect(ConfigurationManager.getMongoConversationConnectionString());

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

var Profile=bookshelf.Model.extend(
    {
        tableName:'profile',
        idAttribute: '_id',
        user: function() {
            return this.hasOne(User,'_id');
        }
    }
);
var Profiles=bookshelf.Collection.extend({model:Profile});

var Models={

    //Account Models
    Profile:Profile,
    Profiles:Profiles,

    //Mongo Models
    DbConfig:dbConfig,
    bookshelf:bookshelf
    
};
module.exports=Models;