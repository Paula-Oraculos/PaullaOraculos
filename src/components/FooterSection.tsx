export const FooterSection = () => {
  return (
    <footer className="py-6 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-1">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Paula Oráculos - Mentoria Oraculista Desperta
          </p>
          <p className="text-slate-500 text-xs">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
