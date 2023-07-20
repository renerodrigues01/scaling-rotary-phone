import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('last_name', 255).notNullable()
      table.string('first_name', 255).notNullable()
      table.string('phone', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.enum('title', ['mr', 'mrs', 'ms', 'dr', 'prof']).notNullable()
      table.enum('marital_status', ['single', 'married', 'divorced', 'widowed']).notNullable()
      table.enum('role', ['admin', 'user']).notNullable().defaultTo('user')
      table.enum('status', ['active', 'inactive', 'suspended']).notNullable().defaultTo('active')
      table.enum('language', ['en', 'fr', 'de', 'es', 'it', 'nl', 'pt']).notNullable().defaultTo('en')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
