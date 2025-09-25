// Конфигурация БД
import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "maindb",
    password: "maindb",
    database: "equipmentdb",
    entities: ["src/models/*.ts"],
    logging: true,
    synchronize: true,
});

export default dataSource;