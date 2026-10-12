import { useEffect, useRef, useState } from 'react';

interface SkillNode { text: string; x: number; y: number; w: number; h: number; vx: number; vy: number; depth: number; }

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const frameRef = useRef<number>();
  const [ready, setReady] = useState(false);

  const skills = [
    'Java 17+', 'Spring Boot', 'JPA/Hibernate', 'JUnit/Mockito', 'REST APIs',
    'Angular', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
    'MSSQL', 'MySQL', 'PostgreSQL', 'Oracle', 'Cosmos DB', 'Redis', 'Liquibase',
    'Azure', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Azure DevOps', 'Jenkins',
    'Git/GitHub', 'Agile', 'TDD', 'Design Patterns', 'DevOps', 'CDC',
    'Grafana', 'Snyk', 'SonarQube', 'GitHub Copilot', 'Prompt Engineering', 'AI Tools',
    'Vert.x', 'Function as a Service (FaaS)', 'GitHub Actions', 'Terraform',
    'AI agents', 'LLM-powered workflows', 'Issue triage automation', 'Workflow orchestration',
    'Hydra on-prem cloud'
  ];

  const MARGIN = 20;

  const updateNodeDimensions = () => {
    nodesRef.current.forEach((n, i) => {
      const span = spanRefs.current[i];
      const scale = 0.85 + n.depth * 0.25;
      if (span && span.offsetWidth > 0 && span.offsetHeight > 0) {
        n.w = span.offsetWidth * scale + MARGIN * 2;
        n.h = span.offsetHeight * scale + MARGIN * 2;
      }
    });
  };

  const init = () => {
    const el = containerRef.current; if (!el) return;
    const { width: W, height: H } = el.getBoundingClientRect();
    const nodes: SkillNode[] = [];
    let seed = skills.length * 113 + Math.floor(W + H);
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    skills.forEach((text, i) => {
      const depth = (text.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 100) / 100;
      const scale = 0.85 + depth * 0.25;
      const span = spanRefs.current[i];
      let w = 140 * scale + MARGIN * 2;
      let h = 40 * scale + MARGIN * 2;
      if (span && span.offsetWidth > 0 && span.offsetHeight > 0) {
        w = span.offsetWidth * scale + MARGIN * 2;
        h = span.offsetHeight * scale + MARGIN * 2;
      }
      nodes.push({
        text,
        x: (0.15 + 0.7 * rand()) * W,
        y: (0.2 + 0.6 * rand()) * H,
        w,
        h,
        vx: (rand() - 0.5) * 0.3,
        vy: (rand() - 0.5) * 0.3,
        depth
      });
    });

    // Resolve initial overlaps
    for (let iter = 0; iter < 100; iter++) {
      let moved = false;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const A = nodes[i], B = nodes[j];
          const dx = A.x - B.x; const dy = A.y - B.y;
          const ox = (A.w + B.w) * 0.5 - Math.abs(dx);
          const oy = (A.h + B.h) * 0.5 - Math.abs(dy);
          if (ox > 0 && oy > 0) {
            if (ox < oy) { const push = ox * 0.5 * Math.sign(dx || (rand() - 0.5)); A.x += push; B.x -= push; }
            else { const push = oy * 0.5 * Math.sign(dy || (rand() - 0.5)); A.y += push; B.y -= push; }
            moved = true;
          }
        }
      }
      for (const n of nodes) {
        const minX = n.w * 0.5;
        const maxX = Math.max(minX, W - n.w * 0.5);
        const minY = n.h * 0.5;
        const maxY = Math.max(minY, H - n.h * 0.5);
        n.x = Math.min(maxX, Math.max(minX, n.x));
        n.y = Math.min(maxY, Math.max(minY, n.y));
      }
      if (!moved) break;
    }
    nodesRef.current = nodes;
  };

  const render = () => {
    nodesRef.current.forEach((n, i) => {
      const el = spanRefs.current[i]; if (!el) return;
      const scale = 0.85 + n.depth * 0.25;
      el.style.transform = `translate(${n.x}px, ${n.y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.filter = `blur(${(1 - n.depth) * 0.8}px) brightness(${0.85 + n.depth * 0.25})`;
      el.style.zIndex = String(10 + Math.floor(n.depth * 40));
    });
  };

  const step = () => {
    const el = containerRef.current; if (!el) return;
    const { width: W, height: H } = el.getBoundingClientRect();
    updateNodeDimensions();
    const nodes = nodesRef.current;
    // integrate motion
    for (const n of nodes) {
      n.vx += (Math.random() - 0.5) * 0.015;
      n.vy += (Math.random() - 0.5) * 0.015;
      n.vx *= 0.988; n.vy *= 0.988;
      const sp = Math.hypot(n.vx, n.vy);
      const maxSp = 0.55 + n.depth * 0.45;
      if (sp > maxSp) { n.vx = (n.vx / sp) * maxSp; n.vy = (n.vy / sp) * maxSp; }
      n.x += n.vx; n.y += n.vy;

      const minX = n.w * 0.5;
      const maxX = W - n.w * 0.5;
      const minY = n.h * 0.5;
      const maxY = H - n.h * 0.5;

      if (maxX >= minX) {
        if (n.x < minX) { n.x = minX; n.vx = Math.abs(n.vx) * 0.6; }
        if (n.x > maxX) { n.x = maxX; n.vx = -Math.abs(n.vx) * 0.6; }
      } else {
        n.x = W * 0.5;
      }

      if (maxY >= minY) {
        if (n.y < minY) { n.y = minY; n.vy = Math.abs(n.vy) * 0.6; }
        if (n.y > maxY) { n.y = maxY; n.vy = -Math.abs(n.vy) * 0.6; }
      } else {
        n.y = H * 0.5;
      }
    }
    // minor collision pass
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const A = nodes[a], B = nodes[b];
        const dx = A.x - B.x, dy = A.y - B.y;
        const ox = (A.w + B.w) * 0.5 - Math.abs(dx);
        const oy = (A.h + B.h) * 0.5 - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (ox < oy) { const push = ox * 0.5 * Math.sign(dx || 1); A.x += push; B.x -= push; A.vx += push * 0.01; B.vx -= push * 0.01; }
          else { const push = oy * 0.5 * Math.sign(dy || 1); A.y += push; B.y -= push; A.vy += push * 0.01; B.vy -= push * 0.01; }
        }
      }
    }
    render();
    frameRef.current = requestAnimationFrame(step);
  };

  const handleClick = (e: React.MouseEvent) => {
    const el = containerRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left; const cy = e.clientY - rect.top;
    const radius = Math.min(rect.width, rect.height) * 0.4;
    nodesRef.current.forEach(n => {
      const dx = n.x - cx; const dy = n.y - cy; const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const f = (1 - dist / radius) * 10;
        const nx = dx / (dist || 1); const ny = dy / (dist || 1);
        n.vx += nx * f; n.vy += ny * f;
      }
    });
  };

  useEffect(() => {
    init();
    updateNodeDimensions();
    render();
    setReady(true);
    frameRef.current = requestAnimationFrame(step);
    const onResize = () => { init(); updateNodeDimensions(); render(); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
  <section id="skills" className="py-32 relative bg-accent/20 overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Skills</h2>
        </div>
        <ul className="sr-only" aria-label="List of technical skills">
          {skills.map(s => <li key={`sr-${s}`}>{s}</li>)}
        </ul>
        <div
          ref={containerRef}
          onClick={handleClick}
          className="relative hidden md:block cursor-pointer select-none"
          style={{
            height: '70vh',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 92%)',
            maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 92%)'
          }}
        >
          {skills.map((s, i) => (
            <span
              key={s}
              ref={el => { if (el) spanRefs.current[i] = el; }}
              className="absolute font-semibold whitespace-nowrap pointer-events-none select-none will-change-transform"
              style={{
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(0.75rem, 0.85rem + 1.1vw, 3rem)',
                color: 'hsl(var(--foreground) / 0.75)',
                textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                opacity: ready ? 1 : 0,
                transition: 'opacity 0.9s ease'
              }}
            >
              {s}
            </span>
          ))}
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">Preparing cloud...</div>}
        </div>
        <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-4">
          {skills.map(s => <div key={s} className="truncate font-medium tracking-tight">{s}</div>)}
        </div>
      </div>
    </section>
  );
};
