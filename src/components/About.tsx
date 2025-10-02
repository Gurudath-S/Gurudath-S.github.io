export const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">About</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground border-l-2 border-border pl-8">
            <p>
              Software Engineer with 4+ years of experience building scalable, Java-based microservices. 
              Currently working at LTIMindtree, where I design and maintain high-availability systems for 
              large-scale enterprise applications.
            </p>
            
            <p>
              Skilled in Spring Boot, REST APIs, SQL/NoSQL databases, and CI/CD pipelines. I'm passionate 
              about solving complex technical problems and delivering reliable, well-architected solutions 
              in Agile environments.
            </p>
            
            <p>
              I've reduced defect rates by 25-30% through advanced debugging and performance tuning, 
              and have led teams to deliver critical features on time. My recent M.Tech dissertation 
              focused on performance and cost analysis across different software architectures.
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

            <div className="border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Recognition</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <span>Shooting Star Q4FY25 (LTIMindtree)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <span>Emerging Dynamo (LTIMindtree)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <span>SpotOn-HATSOFF (Mindtree)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <span>SpotOn A-Team (Mindtree)</span>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-border">
                  <div className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                  <span>Microsoft Certified: Azure Fundamentals (AZ-900)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
