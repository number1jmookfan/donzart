import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("instruments").collect();
  },
});

export const addInstrument = mutation({
  args: { volume: v.number(), position: v.number() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("instruments", {
      volume: args.position,
      position: args.volume,
    });
    return newTaskId;
  },
});
