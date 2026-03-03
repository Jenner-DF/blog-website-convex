import Test from "@/components/web/test";
import { isAuthenticated } from "@/lib/auth-server";

export default async function Home() {
  const asd = await isAuthenticated();
  // const asd = await authClient.getSession(); FOR CLIENT COMPONENTS
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        <code>{JSON.stringify(asd)}</code>
      </p>
      <Test />
    </main>
  );
}
