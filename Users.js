require('dotenv').config();

const dbUsers = {
    id: 1,
    memoryDb: new Map(),

    insert: function (obj) {
      this.memoryDb.set(this.id++, obj);
    },
    
    findById: function (id) {
      return {
        found : true, 
        user : this.memoryDb.get(id)
      };
    },

    findByEmail: function (email) {
      let found = false;
      let user = {};

      this.memoryDb.forEach(function (element) {
        if (element.email === email) {
            found = true; 
            user = element;
        }
      })

      return {
        found : found, 
        user : user
      };

    },

    update(id, obj) {
      if (this.memoryDb.get(id)) {
        this.memoryDb.set(id, obj);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    },

    delete(id) {
      if (this.memoryDb.get(id)) {
        this.memoryDb.delete(id);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    }
};
  
dbUsers.insert({ 
    email: "john@email.com",
    username: "john",
    motdepasse: process.env.MOTDEPASSE_1,
});

dbUsers.insert({ 
  email: "jean@dupont.com",
  username: "jean48",
  motdepasse: process.env.MOTDEPASSE_2,
});

module.exports = dbUsers;