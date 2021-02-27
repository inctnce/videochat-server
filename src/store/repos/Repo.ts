import fs from "fs";
import Database from "@db/Database";

class Repo {
  private static _instance: Repo;
  protected db: Database = new Database();

  constructor() {
    if (Repo._instance) {
      return this;
    }
    Repo._instance = this;
  }
}

export default Repo;
