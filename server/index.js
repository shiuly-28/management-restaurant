const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
require('dotenv').config()
const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

// middleware
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://assignment-11-resturent.web.app'], 
    credentials: true
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS }@clustersheauly.6uz8dzi.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSheauly`;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized, No cookies found" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token parsing failed" });
        next();
    });
};

app.post("/jwt", async (req, res) => {
    const { email } = req.body;
    console.log(req.body);
    const user = { email };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
    console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.send({ message: "token sent", status: true });
});

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const resturentCollection = client.db('Management_Resturent').collection('resturent');

        // resturent api
        app.get('/resturent', async (req, res) => {
            const cursor = resturentCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/resturent/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await resturentCollection.findOne(query);
            res.send(result)
        })



        app.get('/resturent', async (req, res) => {
            const search = req.query.search || '';
            const query = search
                ? { name: { $regex: search, $options: 'i' } }
                : {};

            const result = await resturentCollection.find(query).toArray();
            res.send(result);
        });

        app.get("/resturent-email",verifyToken, async (req, res) => {
            const userEmail = req.query.email;
            const result = await resturentCollection.find({
                addedByEmail: userEmail
            }).toArray();
            res.send(result);

        });

        // Example: GET /posts?search=pizza
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


        app.post('/resturent', async (req, res) => {
            const newPost = req.body;
            const result = await resturentCollection.insertOne(newPost);
            res.send(result);
        });
        
        app.put('/resturent/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const resturentCollection = req.body;
            const updatedDoc = {
                $set:resturentCollection
            }
            const result = await resturentCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.put('/resturent/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedResturent = req.body;
            const updatedDoc = {
                $set: updatedResturent
            }
            const result = await resturentCollectionCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.patch('/resturent/:id',verifyToken, async (req, res) => {
            const id = req.params?.id;
            const filter = { _id: new ObjectId(id) };
            const updatedFood = req.body;
            const updateDoc = { $set: updatedFood };
            const result = await resturentCollection.updateOne(filter, updateDoc);
            res.send(result);
        })


        app.delete('/resturent/:id',verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await resturentCollection.deleteOne(query);
            res.send(result)
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Management resturent')
})

app.listen(port, () => {
    console.log(`Management resturent server running on port ${port}`)
})
