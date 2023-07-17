import  express  from "express";
import cors from'cors'
import mongoose from "mongoose";
import {userRouter} from'./routes/userRoute.js';
import {recipesRouter} from'./routes/recipes.js'

const app = express();

app.use([cors(),express.json(),express.urlencoded({extended:true})])

app.use('/auth',userRouter);
app.use('/recipes',recipesRouter);

mongoose.connect('mongodb+srv://mernStack2:marn112233@cluster0.indkzmh.mongodb.net/resipes?retryWrites=true&w=majority');

app.listen(3001,()=> console.log('SERVER STARTED'))