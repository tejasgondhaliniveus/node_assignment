const supertest = require('supertest');
const http = require('http')
const app = require('../../server')

test('excepts all params', async () => {
    jest.setTimeout(15000)
    const rawData = { 'name': 'abc', 'email': 'abc@gmail.com', 'mobile': 9323525791, 'isActive': true }
    await supertest(app)
        .post('/create-user')
        .send(rawData)
        .expect(201)
        .then(response => {
            expect(response.status).toEqual(201);
            // console.log(response._body)
            expect(response._body.success).toEqual(true);
            expect(response._body.result.email).toEqual(rawData.email)
            expect(response._body.result.mobile).toEqual(rawData.mobile)
            expect(response._body.result.isActive).toEqual(rawData.isActive)
        })
})

test('excepts all params', async () => {
    const rawData = {
        userId: "63f33c5c119605db33274693",
        dateOfPurchased: new Date(),
        amount: 3000,
        isActive: true,
        spendOnItem: 'jeans'
    }
    await supertest(app)
        .post('/create-user-transaction')
        .send(rawData)
        .expect(201)
        .then(response => {
            expect(response.status).toEqual(201);
            // console.log(response._body)
            expect(response._body.success).toEqual(true);
            expect(response._body.result.userId).toEqual(rawData.userId)
            expect(response._body.result.amount).toEqual(rawData.amount)
            expect(response._body.result.spendOnItem).toEqual(rawData.spendOnItem)
        })
})

test('excepts all params', async () => {
    const rawData = {
        userId: "63f33c5c119605db33274693",
        dateOfPurchased: new Date(),
        amount: 3000,
        isActive: true,
        spendOnItem: 'jeans'
    }
    await supertest(app)
        .post('/create-user-transaction')
        .send(rawData)
        .expect(201)
        .then(async response => {
            expect(response.status).toEqual(201);
            // console.log(response._body)
            expect(response._body.success).toEqual(true);
            expect(response._body.result.userId).toEqual(rawData.userId)
            expect(response._body.result.amount).toEqual(rawData.amount)
            expect(response._body.result.spendOnItem).toEqual(rawData.spendOnItem)
            await supertest(app)
                .get('/user-transactions/'+(response._body.result.userId).toString())
                .expect(200)
                .then(response => {
                    expect(response.status).toEqual(200);
                    console.log(response._body.result)
                    expect(response._body.success).toEqual(true);                        
                })
        })
})

