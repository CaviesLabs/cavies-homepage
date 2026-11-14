import { DurableObject } from "cloudflare:workers";
import { initLedger, reserve, type EnquiryReservation } from "./rate-limit";

// One instance (named "global") holds the whole enquiry ledger.
export class EnquiryLedger extends DurableObject {
  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);
    initLedger(ctx.storage.sql);
  }

  reserve(hashedClient: string): EnquiryReservation {
    return this.ctx.storage.transactionSync(() =>
      reserve(this.ctx.storage.sql, hashedClient, Date.now()),
    );
  }
}
