const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const app = require('./index'); // Mengimpor instance aplikasi Express
app.use(express.json());

describe('Quiz Integration Service', () => {
    beforeAll(async () => {
        await mongoose.connect(
            "mongodb+srv://ahmadsiddiqp:cIEiu8ExZFm3fatk@cluster0.pzfilcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('POST /api/quiz/create', async () => {
        console.log("POST /api/quiz/create");
        const res = await request(app)
            .post('/api/quiz/create')
            .send({
                title: 'Sample Quiz',
                startTime: '2024-06-10T12:00:00.000Z',
                endTime: '2024-06-10T13:00:00.000Z'
            })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NzIwYWQ4YTcwZDYxMmYwZmU4MTcwIn0sImlhdCI6MTcxODAzNTg5MywiZXhwIjoxNzE4MDUzODkzfQ.Ev9wkU18VBCd5Szc7HoXg---thKQOL6c5lmNVcJoNOY'); // Ganti 'yourAuthToken' dengan token yang valid

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe('Sample Quiz');
    });
});