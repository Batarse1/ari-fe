import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="bg-ari-white flex min-h-screen flex-col items-center justify-center space-y-8 p-4 md:p-6 md:px-12 lg:px-24 w-full">
      <h1 className="uppercase text-center font-semibold text-base md:text-lg">
        Secure Data Exchange Software
      </h1>
      <Form />
    </main>
  );
}
