// Конфигурация БД
import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "maindb",
    password: "maindb",
    database: "maindb",
    entities: ["src/models/*.js"],
    logging: true,
    synchronize: true,
});

export default dataSource;
