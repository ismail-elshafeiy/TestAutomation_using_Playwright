import { waitOnEventOrTimeout } from "pdfjs-dist-es5/types/web/event_utils";
import { Client } from "pg";

let pgClient: Client;

export class DBActions {
  async connectDB(dbUsername: string, dbPassword: string, dbServerName: string, dbPort: string, dbName: string) {
    const connectionString = `postgres://${dbUsername}:${dbPassword}@${dbServerName}:${dbPort}/${dbName}`;
    //   pgClient = await new pgClient(connectionString);
    //   await pgClient.connect();

    // Instantiate Client here
    pgClient = new Client({ connectionString });
    await pgClient.connect();
  }

  async query(queryString: string): Promise<string> {
    console.log("Querying the database");

    const result = await pgClient.query(queryString);
   // waitOnEventOrTimeout({ target: pgClient, name: "query", delay: 10000 });
    console.log(result.rows);
    return result;
  }
}
