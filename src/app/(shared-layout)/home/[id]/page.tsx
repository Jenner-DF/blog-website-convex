export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const filters = await searchParams;
  console.log(filters);
  return <div>HomePage {id} </div>;
}
