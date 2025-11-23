export const FooterSection = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-cosmic-dark/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Paula Oráculos - Mentoria Oraculista Desperta
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Este produto não é afiliado, associado, autorizado, endossado ou de qualquer 
            forma oficialmente conectado a nenhuma instituição religiosa ou esotérica.
          </p>
          <p className="text-sm text-slate-500">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
