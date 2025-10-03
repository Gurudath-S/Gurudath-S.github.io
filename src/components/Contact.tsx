import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useClickSound } from '@/hooks/useAudio';

export const Contact = () => {
  const { playClickSound } = useClickSound();
  
  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Contact</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                I'm always interested in hearing about new opportunities and challenging projects. 
                Feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:gurudath20102000@gmail.com"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  <Mail className="h-5 w-5" />
                  <span className="transition-colors">gurudath20102000@gmail.com</span>
                </a>
                
                <a 
                  href="tel:+919846540784"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  <Phone className="h-5 w-5" />
                  <span className="transition-colors">+91 9846540784</span>
                </a>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Bengaluru, Karnataka 560059</span>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/gurudath-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="border border-border p-3 hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/gurudath-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="border border-border p-3 hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="border border-border p-8 bg-card">
              <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                Whether you have a question, want to discuss a project, or just want to say hi, 
                I'll do my best to get back to you!
              </p>
              <a
                href="mailto:gurudath20102000@gmail.com"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center w-full px-8 py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
