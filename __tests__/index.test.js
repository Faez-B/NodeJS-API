const app = require('../index');
const request = require('supertest');

describe('Section 1', () => {
    it("should return all tâches", async () => {
        const result = await request(app)
            .get("/taches")
            .expect(200);
    })
})