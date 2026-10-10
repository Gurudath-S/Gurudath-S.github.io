export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative bg-accent/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Experience</h2>
          
          <div className="space-y-8">
            <article className="border border-border p-8 hover:bg-card transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Software Engineer · Platform Team</h3>
                  <div className="text-lg text-muted-foreground">EPAM Systems · American Express (client-site assignment)</div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">December 2025 – Present</div>
              </div>

              <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                <li>Analyze and resolve issues in American Express’s internal function-as-a-service platform, built with Java and Vert.x and deployed on Hydra on-premises cloud.</li>
                <li>Maintain and troubleshoot complex GitHub Actions workflows supporting the platform team’s delivery and operations.</li>
                <li>Designed and built an AI-backed support agent that classifies issues into workflows, analyzes multiple data sources, and recommends knowledge-grounded solutions—reducing issue identification and resolution time by about 80%.</li>
                <li>Working on replicating the platform in AWS with Terraform so users can also benefit from public-cloud deployment.</li>
              </ul>
            </article>

            <article className="border border-border p-8 hover:bg-card transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Software Engineer</h3>
                  <div className="text-lg text-muted-foreground">LTIMindtree</div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                  August 2021 – November 2025
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <div className="flex gap-3">
                  <div className=" bg-foreground mt-2 flex-shrink-0" />
                  <p>
                   I design and build scalable Java microservices with Spring Boot, delivering reliable systems on Azure and AWS. From crafting secure APIs to optimizing CI/CD pipelines, I focus on speed, quality, and resilience. My work has cut defect rates by 30% and powered loyalty programs for P&G, where I also led a 7-member team to ship features clients could trust.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
