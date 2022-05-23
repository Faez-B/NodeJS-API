const dbTaches = {
    id: 1,
    memoryDb: new Map(),

    insert: function (obj) {
      this.memoryDb.set(this.id++, {...obj, faite : false} );
    },

    getAll: function () {
      return Object.fromEntries(this.memoryDb);
    },

    getOneById: function (id) {
      return this.memoryDb.get(id);
    },

    update(id, obj) {
      if (this.memoryDb.get(id)) {
        this.memoryDb.set(id, obj);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    }
};
  
dbTaches.insert({ 
    description: "Tâche 1", 
    faite : false 
});

dbTaches.insert({ 
    description: "Tâche 2", 
    faite : true 
});

dbTaches.insert({ 
    description: "Tâche 3", 
    faite : false 
});

module.exports = dbTaches;