export const Footer = () => {
  return (
    <footer className="py-8 bg-muted/30 border-t">
      <div className="container px-4 mx-auto">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WhatsApp AI Sales. Todos os direitos reservados.</p>
          <p className="mt-2">
            Este produto não é afiliado, associado, autorizado, endossado ou de qualquer forma 
            oficialmente conectado ao WhatsApp, ou qualquer uma de suas subsidiárias ou afiliadas.
          </p>
        </div>
      </div>
    </footer>
  );
};