import { Client, QueryResult } from 'pg';

let pgClient: Client;

export class DBActions {
  async connectDB(dbUsername: string, dbPassword: string, dbServerName: string, dbPort: string, dbName: string): Promise<void> {
    try {
      const connectionString = `postgres://${dbUsername}:${dbPassword}@${dbServerName}:${dbPort}/${dbName}`;

      // Instantiate Client here
      pgClient = new Client({ connectionString });
      await pgClient.connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async query(queryString: string): Promise<QueryResult> {
    try {
      console.log('Querying the database');

      if (!pgClient) {
        throw new Error('Database client not initialized. Call connectDB first.');
      }

      const result = await pgClient.query(queryString);
      console.log(result.rows);
      return result;
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (pgClient) {
        await pgClient.end();
        console.log('Database disconnected successfully');
      }
    } catch (error) {
      console.error('Failed to disconnect from database:', error);
      throw error;
    }
  }
}
