import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './mongodb';
import NextCors from 'nextjs-cors';

export const getLists = async () => {
    const mongoClient = await clientPromise;
    const data = (await mongoClient
        .db('test')
        .collection('lists')
        .find()
        .toArray());

    return JSON.parse(JSON.stringify(data));
};

export const addList = async (list) => {
    const mongoClient = await clientPromise;
    const response = await mongoClient
        .db('test')
        .collection('lists')
        .insertOne(list);

    return response._id;
};

export default async (req,res) => {
    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
        ],
        optionsSuccessStatus: 200,
    });
    if (req.method === 'GET') {
        const data = await getLists();
        res.status(200).json({ list: data });
    } else if (req.method === 'POST') {
        if (req.body.name && req.body.description) {
            const list = {
                name: req.body.name,
                description: req.body.description,
                // orders: req.body.orders.map(order => {
                //     return { ...order, _id};
                // }),
            };

            const insertedId = await addList(list);
            res.revalidate('/lists');
            res.revalidate('/lists/' + insertedId);
            res.status(200).json(insertedId);
        } else {
            res.status(400).json({ error: 'name and description are required.' });
        }
    }
};