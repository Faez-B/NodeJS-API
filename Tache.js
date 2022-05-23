const dbTaches = {
    id: 1,
    memoryDb: new Map(),

    insert: function (obj) {
      this.memoryDb.set(this.id++, obj);
    },

    getAll: function () {
      return Object.fromEntries(this.memoryDb);
    },
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