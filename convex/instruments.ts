import { GenericDocument } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import {trackData} from "../src/app/types"

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("instruments").collect();
  },
});

// Create a new task with the given text
export const updateInstruments = mutation({
  args: {
    track: v.number(),
    position: v.number(),
    type: v.string(),
    volume: v.optional(v.number()),
    id: v.id("instruments"),
  },
  handler: async (ctx, args) => {
    const track: trackData = await ctx.db.get(args.id);
    const newPositions = track.positions.map((pos, index) => {
      if (index === args.position) {
        return args.type !== "Erase"
          ? { type: args.type, volume: args.volume }
          : {};
      }
      return pos;
    });
    const newTaskId = await ctx.db.patch(args.id, { positions: newPositions });
    //insert("instruments", { text: args.text });
    return newTaskId;
  },
});
