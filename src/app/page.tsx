import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="bg-ari-white flex min-h-screen flex-col items-center justify-center space-y-8 p-6 px-24">
      <h1 className="uppercase font-semibold text-lg">
        Secure Data Exchange Software
      </h1>
      <Form />
    </main>
  );
}
