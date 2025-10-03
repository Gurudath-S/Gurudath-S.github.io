export const Recognitions = () => {
  const items = [
    'Shooting Star Q4FY25 (LTIMindtree)',
    'Emerging Dynamo (LTIMindtree)',
    'SpotOn-HATSOFF (Mindtree)',
    'SpotOn A-Team (Mindtree)',
    'Microsoft Certified: Azure Fundamentals (AZ-900)'
  ];

  return (
    <section id="recognitions" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Recognitions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border p-6 bg-card/40 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Awards & Certifications</h3>
              <ul className="space-y-3 text-sm">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border border-dashed border-border/60 text-sm text-muted-foreground flex items-center">
              <p>
                Resourceful and results-driven, adept at tackling complex problems swiftly using creative and pragmatic approaches across large-scale initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
