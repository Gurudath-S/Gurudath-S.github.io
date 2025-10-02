export const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Projects</h2>
          
          <div className="border border-border p-8 hover:bg-card transition-colors">
            <h3 className="text-2xl font-bold mb-4">
              M.Tech Dissertation: Performance & Cost Analysis of Software Architectures
            </h3>
            
            <p className="text-muted-foreground mb-6">
              An empirical evaluation of the performance, cost, and complexity of migrating a Java application 
              between monolithic, microservice (AKS), and modular monolith (Azure App Service) architectures.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Architected and implemented three distinct versions of a business capability using Java, 
                  Spring Boot, and Docker, deploying them to different Azure services for comparative analysis
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Quantified performance under identical load tests, which showed the microservice was fastest 
                  (297ms avg. response) while the traditional monolith struggled with high tail latency 
                  (1190ms 99th percentile)
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Analyzed and compared cloud infrastructure costs, revealing the modular monolith was the most 
                  cost-effective solution at ₹52.35/day, significantly less than the microservice deployment 
                  on AKS at ₹344.62/day
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'Spring Modulith', 'Docker', 'Kubernetes (AKS)', 
                'Azure App Service', 'Azure VM', 'Maven'].map((tech) => (
                <span key={tech} className="border border-border px-3 py-1 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
