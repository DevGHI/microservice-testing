import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "friends";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("sender_user_id").unsigned().references("users.id").onDelete("CASCADE");
      table.integer("receiver_user_id").unsigned().references("users.id").onDelete("CASCADE");
      table.enum("status", ["pending", "accepted"]).defaultTo("pending");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
