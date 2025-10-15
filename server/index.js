const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustersheauly.6uz8dzi.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSheauly`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const resturentCollection = client.db('Management_Resturent').collection('resturent');

        // Get all restaurants OR search by name
        app.get('/resturent', async (req, res) => {
            try {
                const search = req.query.search || '';
                const query = search
                    ? { name: { $regex: search, $options: 'i' } }
                    : {};
                
                const result = await resturentCollection.find(query).toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch restaurants' });
            }
        });

        // Get single restaurant by ID
        app.get('/resturent/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await resturentCollection.findOne(query);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch restaurant' });
            }
        });

        // Get restaurants by user email
        app.get("/resturent-email", async (req, res) => {
            try {
                const userEmail = req.query.email;
                const result = await resturentCollection.find({
                    addedByEmail: userEmail
                }).toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch user restaurants' });
            }
        });

        // Search posts (alternative endpoint)
        app.get('/posts', async (req, res) => {
            try {
                const search = req.query.search || '';
                const query = {
                    name: { $regex: search, $options: 'i' },
                };
                const result = await resturentCollection.find(query).toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch posts' });
            }
        });

        // Create new restaurant
        app.post('/resturent', async (req, res) => {
            try {
                const newPost = req.body;
                const result = await resturentCollection.insertOne(newPost);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to create restaurant' });
            }
        });
        
        // Update restaurant (full update with upsert)
        app.put('/resturent/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const options = { upsert: true };
                const updatedResturent = req.body;
                const updatedDoc = {
                    $set: updatedResturent
                };
                const result = await resturentCollection.updateOne(filter, updatedDoc, options);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to update restaurant' });
            }
        });

        // Partial update restaurant
        app.patch('/resturent/:id', async (req, res) => {
            try {
                const id = req.params?.id;
                const filter = { _id: new ObjectId(id) };
                const updatedFood = req.body;
                const updateDoc = { $set: updatedFood };
                const result = await resturentCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to patch restaurant' });
            }
        });

        // Delete restaurant
        app.delete('/resturent/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await resturentCollection.deleteOne(query);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to delete restaurant' });
            }
        });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Management resturent')
});

app.listen(port, () => {
    console.log(`Management resturent server running on port ${port}`)
});