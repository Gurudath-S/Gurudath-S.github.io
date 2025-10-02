export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative bg-accent/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Experience</h2>
          
          <div className="space-y-12">
            <div className="border border-border p-8 hover:bg-card transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Software Engineer</h3>
                  <div className="text-lg text-muted-foreground">LTIMindtree</div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                  August 2021 - Present
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Designed, developed, and maintained high-availability, Java-based microservices using 
                    Spring Boot, contributing to product development for a large-scale P&G business application
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Built and consumed secure, scalable RESTful APIs while working extensively with SQL (MSSQL) 
                    and NoSQL (Cosmos DB) databases for backend data services
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Architected and maintained robust CI/CD pipelines using Azure DevOps, integrating SonarQube 
                    and Snyk for automated quality and security gates
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Deployed and managed applications on cloud platforms, with hands-on experience in Azure 
                    (AKS, App Services, Key Vault) and foundational knowledge of AWS (EC2, S3, EKS)
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Reduced defect rates by 25-30% through advanced debugging, log-centric analysis (Grafana), 
                    and performance tuning of microservices in a complex distributed system
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <p>
                    Owned end-to-end delivery for a key loyalty program, leading a 7-person team and collaborating 
                    directly with the client to solve problems and guarantee reliable, on-time releases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
