// import { mutation } from "./_generated/server";

// export const store = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Called storeUser without authentication present");
//     }

//     // Check if we've already stored this identity before.
//     // Note: If you don't want to define an index right away, you can use
//     // ctx.db.query("users")
//     //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
//     //  .unique();
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier),
//       )
//       .unique();
//     if (user !== null) {
//       // If we've seen this identity before but the name has changed, patch the value.
//       if (user.name !== identity.name) {
//         await ctx.db.patch(user._id, { name: identity.name });
//       }
//       return user._id;
//     }


//     // If it's a new identity, create a new `User`.
//     return await ctx.db.insert("users", {
//       name: identity.name ?? "Anonymous",
//       tokenIdentifier: identity.tokenIdentifier,
//     });
//   },
// });


//code taken from chatgpt
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    name: v.string(),
    email: v.string(), // <- must be passed from frontend
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      if (user.name !== args.name) {
        await ctx.db.patch(user._id, { name: args.name });
      }
      return user._id;
    }

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      tokenIdentifier: args.tokenIdentifier,
      imageUrl: args.imageUrl,
    });
  },
});
