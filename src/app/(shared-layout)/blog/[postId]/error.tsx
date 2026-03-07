"use client";
export default function ErrorPage({ error }: { error: Error }) {
  return <div>ErrorPage in blogpost[id]{JSON.stringify(error.message)}</div>;
}
