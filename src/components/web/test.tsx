"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
export default function Test() {
  const tasks = useQuery(api.tasks.get);
  const user = useQuery(api.tasks.auth);
  return (
    <div>
      <h1>User ko: {user?.name || "not signed in"}</h1>
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}
