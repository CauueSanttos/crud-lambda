import * as dotenv from 'dotenv';
import { 
  Connection, 
  ConnectionManager, 
  ConnectionOptions, 
  createConnection, 
  getConnectionManager 
} from 'typeorm';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager

    constructor() {
        this.connectionManager = getConnectionManager()
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = 'default';

        let connection: Connection;

        if (this.connectionManager.has(CONNECTION_NAME)) {
            connection = await this.connectionManager.get(CONNECTION_NAME);

            if (!connection.isConnected) {
                connection = await connection.connect();
            }
        } else {
            const connectionOptions: ConnectionOptions = {
                name: 'default',
                type: 'postgres',
                port: 5432,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                entities: [
                  '../models/*.ts'
                ],
                migrations: [
                  './migrations/*.ts'
                ],
                cli: {
                  migrationsDir: './migrations'
                }
            };

            connection = await createConnection(connectionOptions);
        }

        return connection;
    }
}