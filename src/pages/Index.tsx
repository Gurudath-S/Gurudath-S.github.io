import { InteractiveBackground } from '@/components/InteractiveBackground';
import { CustomCursor } from '@/components/CustomCursor';
import { AudioControls } from '@/components/AudioControls';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Recognitions } from '@/components/Recognitions';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hide native cursor only on medium and up (md:) so mobile keeps system pointer */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <AudioControls />
      <InteractiveBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
  <About />

        <Experience />
        <Recognitions />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
