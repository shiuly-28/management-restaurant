const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

// middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://assignment-11-resturent.web.app','http://localhost:5174','https://management-restaurant-nine.vercel.app' ], 
    credentials: true
}));

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
        // Connect the client to the server
        // await client.connect();

        // ✅ Define collections
        const resturentCollection = client.db('Management_Resturent').collection('resturent');
        const ordersCollection = client.db('Management_Resturent').collection('orders');

        // ✅✅ IMPORTANT: posts endpoint er jonno resturentCollection use korbo
        // Karon tomar sob food data "resturent" collection e ache
        
        // GET all foods with search & sort
       // GET all foods with search, category filter & sort
// GET all foods with search and category filter (sort removed)
app.get('/posts', async (req, res) => {
    try {
        const { search = '', category = '' } = req.query;
        console.log('📥 Query params:', { search, category });

        // Build query
        let query = {};
        
        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        // Filter by category
        if (category) {
            query.category = category;
        }

        console.log('🔍 MongoDB Query:', query);

        const foods = await resturentCollection
            .find(query)
            .toArray();

        console.log(`✅ Found ${foods.length} foods`);
        res.json(foods);
    } catch (error) {
        console.error("❌ Error fetching foods:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ BONUS: Get all unique categories dynamically
app.get('/categories', async (req, res) => {
    try {
        const categories = await resturentCollection.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

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

        app.get("/resturent-email", async (req, res) => {
            const userEmail = req.query.email;
            const result = await resturentCollection.find({
                addedByEmail: userEmail
            }).toArray();
            res.send(result);
        });

        app.post('/resturent', async (req, res) => {
            const newPost = req.body;
            const result = await resturentCollection.insertOne(newPost);
            res.send(result);
        });
        
        app.patch('/resturent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedFood = req.body;
        const updateDoc = { $set: updatedFood };
        
        console.log('📝 Updating food:', id);
        console.log('📝 Update data:', updatedFood);
        
        const result = await resturentCollection.updateOne(filter, updateDoc);
        
        console.log('✅ Update result:', result);
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Food not found' 
            });
        }
        
        res.json({ 
            success: true, 
            modifiedCount: result.modifiedCount,
            matchedCount: result.matchedCount 
        });
    } catch (error) {
        console.error('❌ Update error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

        app.delete('/resturent/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await resturentCollection.deleteOne(query);
            res.send(result)
        });

        // Orders API
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            if (!email) return res.status(400).send({ message: "Email is required" });

            const result = await ordersCollection.find({ email: email }).toArray();
            res.send(result);
        });

        // Analytics API
        app.get("/analytics", async (req, res) => {
            try {
                console.log("📊 Analytics endpoint hit");

                const orders = await ordersCollection.find().toArray();
                console.log(`✅ Found ${orders.length} orders`);

                const totalOrders = orders.length;
                
                // Calculate total income
                const totalIncome = orders.reduce((sum, order) => {
                    const price = Number(order.price) || 0;
                    return sum + price;
                }, 0);

                // Count foods
                const foodCount = {};
                orders.forEach(order => {
                    if (order.name) {
                        const name = order.name;
                        foodCount[name] = (foodCount[name] || 0) + 1;
                    }
                });

                const topFoods = Object.entries(foodCount)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                const result = { 
                    totalOrders, 
                    totalIncome: totalIncome.toFixed(2),
                    topFoods 
                };

                console.log("✅ Sending analytics:", result);
                res.json(result);
                
            } catch (error) {
                console.error("❌ Analytics error:", error.message);
                res.status(500).json({ 
                    message: "Error fetching analytics data", 
                    error: error.message 
                });
            }
        });

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Management resturent')
})

app.listen(port, () => {
    console.log(`🚀 Management resturent server running on port ${port}`)
})