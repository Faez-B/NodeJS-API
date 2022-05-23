const app = require('../index');
const db = require('../Tache');
const request = require('supertest');
// jest.setTimeout(15000);

describe('Toutes les routes de la section une', () => {
    it("should return all tâches", async () => {
        const result = await request(app)
            .get("/taches")
            .expect(200);
    })

    // it("should return tache matching id", async (obj) => {
    //     const result = await request(app)
    //         .get("/taches/1")
    //         .expect(200);
    //     expect(db.memoryDb.get(1)).toEqual(obj);
    // })
    // it("should not return any object", async (obj) => {
    //     const result = await request(app)
    //         .get("/tache/1000")
    //         .expect(404);

    //     expect(db.memoryDb.get(1)).not.toEqual(obj);
    // })


    // it("should return inserted object", async (obj) => {
    //     const inserted = { description: "New Tache", faite : false};

    //     const result = await request(app)
    //         .post("/taches")
    //         .send(inserted)
    //         .expect(201);

    //     expect(db.memoryDb.get(id)).toMatchObject(inserted);
    // })

    // it("should return delete tache coreesponding to id", async (obj) => {
    //     const result = await request(app)
    //         .delete("/tache/3")
    //         .expect(200);

    //     expect((db.memoryDb.getAll()).length).toBe(2);
    // })
})