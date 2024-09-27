import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 3000;
const app = express();

app.use(cors());  // Enables CORS
app.use(express.json());

app.listen(port, async () => {
    try {
      await mongoose.connect("mongodb+srv://admin:admin@cluster0.ebnx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log(`MySchedule app listening on port ${port}!`);
    } catch (e) {
      console.log("Error connecting to database:", e);
    }
});