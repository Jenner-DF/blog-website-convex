"use client";

import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Separator } from "../ui/separator";

export default function PostPresence({
  postId,
  userId,
}: {
  postId: Id<"posts">;
  userId: string;
}) {
  const presenceState = usePresence(api.presence, postId, userId);
  if (!presenceState || presenceState.length === 0) return null;
  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-xs uppercase text-muted-foreground">
          Viewing now:{" "}
        </h1>
        <FacePile presenceState={presenceState ?? []}></FacePile>
      </div>
      <Separator className="flex-1 my-4" />
    </>
  );
}
// const user = useQuery(api.auth.getCurrentUser);
// const user2 = useQuery(api.presence.getUserId);
// if (!user && !user2) return null;
// const asd: UserIdentity;
// console.log(user, user2);
// const xd = user2!   ;
//middleware runs so user is always true
// const user = useQuery(api.presence.getUserId);
