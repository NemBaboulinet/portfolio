import React, { useState } from 'react';
import { 
  FolderGit2, 
  Mail, 
  Send, 
  Terminal, 
  Layers, 
  Server, 
  ArrowUpRight, 
  Code2
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface Skill {
  name: string;
  level: string;
  category: string;
  icon: React.ReactNode;
}

export default function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projects: Project[] = [
    {
      title: "React + Bun Dev Server",
      description: "A lightning-fast development container utilizing Bun runtime to bundle TSX assets with near-zero latency.",
      tags: ["React", "TypeScript", "Bun", "Vite"],
      link: "#"
    },
    {
      title: "Apache Reverse Proxy & SPA Router",
      description: "Custom Apache (httpd) deployment running inside docker to serve static web builds with server-side SPA rewrites.",
      tags: ["Apache", "Docker", "Rewrites", "Linux"],
      link: "#"
    },
    {
      title: "Next-Gen Architecture Template",
      description: "A clean developer workspace template configured with pre-configured linter and formatter modules.",
      tags: ["TypeScript", "ESLint", "Prettier", "Devcontainer"],
      link: "#"
    }
  ];

  const skills: Skill[] = [
    { name: "Bun", level: "Ultra Fast Runtime", category: "Core", icon: <Terminal size={24} /> },
    { name: "React / TSX", level: "Dynamic UI Library", category: "Core", icon: <Code2 size={24} /> },
    { name: "Apache HTTPD", level: "Industrial Web Server", category: "Server", icon: <Server size={24} /> },
    { name: "TypeScript", level: "Type Safe Logic", category: "Language", icon: <Layers size={24} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <>
      <header>
        <div className="container nav-container">
          <a href="#" className="logo">Bun-Apache.dev</a>
          <ul className="nav-links">
            <li><a href="#projects">Projets</a></li>
            <li><a href="#skills">Compétences</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-glow"></div>
          <div className="hero-tagline">Workspace opérationnel</div>
          <h1 className="hero-title">
            React & Bun <br />
            <span>Sous Apache Server</span>
          </h1>
          <p className="hero-desc">
            Bienvenue dans votre environnement de développement de pointe. Entièrement configuré avec Bun pour une compilation ultra-rapide et hébergé sous Apache pour simuler des conditions réelles de production.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <FolderGit2 size={18} /> Voir les projets
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail size={18} /> Me contacter
            </a>
          </div>
        </section>

        <section id="projects">
          <div className="section-header">
            <h2 className="section-title">Architecture du Projet</h2>
            <p className="section-subtitle">
              Les éléments clés intégrés à ce conteneur de développement pour garantir performances et robustesse.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((proj, idx) => (
              <div className="card" key={idx}>
                <div className="card-img-placeholder">
                  <Terminal size={48} strokeWidth={1} />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{proj.title}</h3>
                  <p className="card-text">{proj.description}</p>
                  <div className="card-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span className="tag" key={tIdx}>{tag}</span>
                    ))}
                  </div>
                  <a href={proj.link} className="card-link">
                    Explorer <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="section-header">
            <h2 className="section-title">Stack Technique</h2>
            <p className="section-subtitle">
              Les technologies au cœur de cet environnement de développement.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <div className="skill-card" key={idx}>
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-level">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="section-header">
            <h2 className="section-title">Prendre Contact</h2>
            <p className="section-subtitle">
              Une question sur la configuration Apache, Bun ou React ? Envoyez-moi un message !
            </p>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Discutons de votre projet</h3>
              <p>
                Ce modèle montre comment coupler l'écosystème Bun avec un serveur traditionnel Apache, assurant la compatibilité avec vos règles d'URL ou services existants.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon"><Terminal size={20} /></div>
                  <div>
                    <strong>Environnement</strong>
                    <p>Docker / Devcontainer</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><Server size={20} /></div>
                  <div>
                    <strong>Serveur Web</strong>
                    <p>Apache 2.4 (mod_rewrite)</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Votre nom" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="votre@email.com" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required 
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Bonjour, j'aimerais..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                {isSubmitted ? "Envoyé !" : <><Send size={16} /> Envoyer le message</>}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Bun-Apache.dev - Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}
