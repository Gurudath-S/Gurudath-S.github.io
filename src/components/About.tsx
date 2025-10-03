export const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">About</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground border-l-2 border-border pl-8">
            <p>
           Hi, I’m Gurudath 👋  

I’m a backend engineer with 4+ years of experience turning complex workflows into clean, event-driven microservices. At LTIMindtree, I’ve helped global clients like P&G deliver faster with resilient systems on Azure and AWS.  
<br />
I thrive at the intersection of <b>speed, scalability, and simplicity</b> — whether it’s debugging production at 2am, optimizing CI/CD pipelines, or reverse-engineering legacy systems.  
<br/>
Outside of code, I love traveling, exploring new tech stacks, and building DIY side projects.

            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium">M.Tech in Software Engineering</div>
                  <div className="text-sm text-muted-foreground">Birla Institute of Technology & Science</div>
                  <div className="text-sm text-muted-foreground">CGPA: 8.8/10 • 2021-2025</div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="font-medium">BCA in Computer Applications</div>
                  <div className="text-sm text-muted-foreground">University of Calicut</div>
                  <div className="text-sm text-muted-foreground">CGPA: 7.8/10 • 2018-2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
