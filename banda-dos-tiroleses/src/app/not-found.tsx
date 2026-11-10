import Link from "next/link";
import { Seta } from "@/components/Ornamentos";

export default function NotFound() {
  return (
    <section className="grain grain-dark flex min-h-[100svh] items-center bg-forest text-ivory">
      <div className="wrap py-40">
        <p className="kicker text-gold">Erro 404 · Seite nicht gefunden</p>
        <h1 className="display t-1 mt-6">Esta página saiu <em className="text-gold">do compasso.</em></h1>
        <Link href="/" className="btn mt-12">Voltar ao início <Seta /></Link>
      </div>
    </section>
  );
}
