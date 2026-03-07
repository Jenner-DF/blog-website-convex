import { UserIdentity } from "convex/server";
import { query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // const asd = await authComponent.getAuthUser(ctx); //this gets the component user in db
    // asd._id
    const identity = await ctx.auth.getUserIdentity(); //this gets the JWT token
    return identity;
  },
});

// ... other functions
