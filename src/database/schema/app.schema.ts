import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './auth.schema';

export const stripe_customers = sqliteTable('stripe_customers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  stripe_customer_id: text('stripe_customer_id').notNull().unique(),
  total_downloads: integer('total_downloads').notNull().default(0),
  plan_active: integer('plan_active', { mode: 'boolean' })
    .notNull()
    .default(false),
  plan_expires: integer('plan_expires', { mode: 'timestamp' }),
  subscription_id: text('subscription_id'),
});
export type StripeCustomer = typeof stripe_customers.$inferSelect;
export type StripeCustomerInsert = typeof stripe_customers.$inferInsert;

export const downloads = sqliteTable('downloads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ts: integer('ts', { mode: 'timestamp' }).default(sql`(current_timestamp)`), // UTC
  image: text('image'),
});
export type Download = typeof downloads.$inferSelect;
export type DownloadInsert = typeof downloads.$inferInsert;
