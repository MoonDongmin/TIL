import * as express from "express";
import catsRoute from "./cats/cats.route";

class Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }

    private setRoute() {
        this.app.use(catsRoute);

    }

    private setMiddleware() {
        // logging Middleware
        this.app.use((req, res, next) => {
            console.log(req.rawHeaders[1]);
            console.log("this is logging middleware")
            next();
        });

        // JSON Middleware
        this.app.use(express.json());

        this.setRoute();

        // 404 Middleware
        this.app.use((req, res, next) => {
            console.log("this is logging middleware");
            res.send({error: '404 not found error'});
        });
    }

    public listen() {
        this.setMiddleware();
        this.app.listen(8000, () => {
            console.log('server is on...')
        });
    }
}

function init(){
    const server = new Server();
    server.listen();
}

init();





