export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-sm text-muted-foreground">
              © 2025 Gurudath S. All rights reserved.
            </div>
            <div className="text-[11px] text-muted-foreground/80">
              Background music by{' '}
              <a
                href="https://pixabay.com/users/siarhei_korbut-49383247/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Siarhei Korbut
              </a>{' '}
              (Pixabay)
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
