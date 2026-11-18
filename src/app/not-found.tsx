import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-gray-300">
        O endereço que você procurou não está disponível.
      </p>
      <Link href="/" className="button-primary">
        Voltar para o início
      </Link>
    </main>
  );
}
