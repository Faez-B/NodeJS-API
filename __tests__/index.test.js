const app = require('../index');
const db = require('../Tache');
const request = require('supertest');

describe('Section 1', () => {
    it("should return all tâches", async () => {
        const result = await request(app)
            .get("/taches")
            .expect(200);
    })

    it("should return tache matching id", async (obj) => {
        const result = await request(app)
            .get("/tache/1")
            .expect(db.memoryDb.get(1)).toEqual(obj);
    })
})