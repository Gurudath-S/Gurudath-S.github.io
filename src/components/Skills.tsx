export const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: ['Java 17+', 'Spring Boot', 'JPA/Hibernate', 'JUnit/Mockito', 'REST APIs', 'Angular', 'Python'],
    },
    {
      title: 'Database',
      skills: ['MSSQL', 'MySQL', 'PostgreSQL', 'Oracle', 'Cosmos DB (NoSQL)', 'Redis', 'Liquibase'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Azure DevOps'],
    },
    {
      title: 'Tools & Methodologies',
      skills: ['Git/GitHub', 'Agile', 'TDD', 'Design Patterns', 'Grafana', 'Snyk', 'SonarQube', 'GitHub Copilot'],
    },
  ];

  return (
    <section id="skills" className="py-32 relative bg-accent/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <div key={category.title} className="border border-border p-6">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border px-3 py-1 text-sm hover:bg-foreground hover:text-background transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
