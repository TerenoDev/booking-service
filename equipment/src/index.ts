import express from "express"
import cors from "cors"
import "reflect-metadata";
import { createServer, Server } from "http"
import { useSwagger } from "./swagger"
import routes from "./routes"
import dataSource from "./config/data-source"
import CategoriesEquipmentController from "./controllers/categoriesEquipmentController";
import {connectRabbitMQ} from "./config/rabbitmq";
import {initEquipmentConsumer} from "./services/equipment.consumer";


class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8004, host = "localhost") {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(express.json())

        app.use('/api', routes)
        const options = {
            routePrefix: '/api',
            controllers: [CategoriesEquipmentController],
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
        };
        useSwagger(app, options);
        return app
    }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    public async start(): Promise<void> {
        // establish database connection
        dataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
        await connectRabbitMQ();
        await initEquipmentConsumer();

        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
            // initSocket(this.server);
        })
    }
}

const app = new App()
app.start()