import "express-async-errors";
import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/user.routes';
import { AppError } from "./errors/AppError";
import { movieRoutes } from "./routes/movie.routes";

const app = express();

app.use(express.json());

// log para verificar as rotas
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Rotas
app.use('/users',userRoutes);
app.use('/movies',movieRoutes);

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }    

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}!`);	
});