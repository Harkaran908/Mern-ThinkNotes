import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware that parses json bodies ; req.body
app.use(cors({
        origins: 'http://localhost:5173',
    })
)
app.use(express.json());
app.use(rateLimiter);


// custom middleware example
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    })
})


