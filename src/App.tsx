import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Server,
  Brain,
  ChevronDown,
  ExternalLink,
  Calendar,
  Award,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Interactive3DLogo from "./components/Interactive3DLogo";

interface MousePosition {
  x: number;
  y: number;
}

interface VisibilityState {
  [key: string]: boolean;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface Project {
  title: string;
  tech: string;
  description: string;
  features: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

const Portfolio = () => {
  const [activeSection, setActiveSection] =
    useState<string>("hero");
  const [mousePosition, setMousePosition] =
    useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<VisibilityState>(
    {},
  );
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive effects (throttled)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 16); // ~60fps
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer for animations (optimized)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    // Only observe specific sections instead of all elements
    const sections = [
      "hero",
      "about",
      "experience",
      "projects",
      "skills",
      "contact",
    ];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Parallax effect (throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const scrolled = window.pageYOffset;
            parallaxRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills: Skill[] = [
    { name: "JavaScript", level: 90, icon: Code },
    { name: "React.js", level: 85, icon: Code },
    { name: "Python", level: 80, icon: Code },
    { name: "MongoDB", level: 75, icon: Database },
    { name: "MySQL", level: 70, icon: Database },
    { name: "AWS", level: 65, icon: Server },
    { name: "Node.js", level: 80, icon: Server },
    { name: "Machine Learning", level: 70, icon: Brain },
  ];

  const projects: Project[] = [
    {
      title: "Online Video Interview Platform",
      tech: "React.js, Node.js, MongoDB, WebRTC",
      description:
        "Full-stack platform with live interviews, chat, scheduling, and history management.",
      features: [
        "Live Video Interviews",
        "Real-time Chat",
        "Interview Scheduling",
        "History Tracking",
      ],
    },
    {
      title: "Student Grade Prediction",
      tech: "Python, Scikit-learn, Pandas, NumPy",
      description:
        "ML model to predict academic performance from student behavioral and academic data.",
      features: [
        "Predictive Analytics",
        "Data Visualization",
        "Performance Metrics",
        "Model Training",
      ],
    },
    {
      title: "Encrypted Door Lock",
      tech: "Arduino, C, Fingerprint Sensor",
      description:
        "Secure fingerprint-based locking system with encryption and access control.",
      features: [
        "Biometric Security",
        "Data Encryption",
        "Access Logs",
        "Hardware Integration",
      ],
    },
    {
      title: "Face Emotion Detection",
      tech: "Python, OpenCV, DeepFace, TensorFlow",
      description:
        "Real-time emotion recognition system using computer vision and deep learning.",
      features: [
        "Real-time Processing",
        "Emotion Classification",
        "Facial Recognition",
        "Live Camera Feed",
      ],
    },
  ];

  const experiences: Experience[] = [
    {
      role: "Frontend Developer Intern",
      company: "Enrich Datascience Pvt. Ltd.",
      period: "Jan 2025 – Feb 2025",
      description:
        "Built responsive dashboards using React.js, Vite, and REST APIs with focus on user experience.",
    },
    {
      role: "CMS Developer Intern",
      company: "EVI Technologies Pvt. Ltd.",
      period: "Sep 2024 – Oct 2024",
      description:
        "Developed intuitive CMS interfaces and enhanced admin dashboard functionality.",
    },
    {
      role: "Salesforce Developer Intern",
      company: "Salesforce, Gwalior",
      period: "May 2024 – Jun 2024",
      description:
        "Customized workflows using Apex and Visualforce, integrated third-party solutions.",
    },
    {
      role: "Backend Developer Intern",
      company: "Rajeev Classes, Kota",
      period: "Oct 2023 – Dec 2023",
      description:
        "Optimized database performance and handled backend operations for educational platform.",
    },
  ];

  const FloatingParticles = React.memo(() => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  ));

  const InteractiveBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
        }}
      />
      <div
        ref={parallaxRef}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl" />
      </div>
    </div>
  );

  const SkillBar = ({
    skill,
    index,
  }: {
    skill: Skill;
    index: number;
  }) => {
    const getDelayMs = (idx: number): number => {
      return Math.min(idx * 150, 1000);
    };

    return (
      <div
        className={`transform transition-all duration-1000 ${
          isVisible.skills
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{
          transitionDelay: `${getDelayMs(index)}ms`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <skill.icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-gray-200">
              {skill.name}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-2000 ease-out"
            style={{
              width: isVisible.skills
                ? `${skill.level}%`
                : "0%",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>
      </div>
    );
  };

  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
  }) => {
    const getDelayMs = (idx: number): number => {
      return (idx + 1) * 200;
    };

    return (
      <div
        className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
          isVisible.projects
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
        style={{
          transition: "all 0.5s ease-out",
          transitionDelay: `${getDelayMs(index)}ms`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-blue-400 text-sm font-medium mb-3">
          {project.tech}
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="space-y-2">
          {project.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-sm text-gray-400">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="w-5 h-5 text-blue-400" />
        </div>
      </div>
    );
  };

  const ExperienceCard = ({
    exp,
    index,
  }: {
    exp: Experience;
    index: number;
  }) => {
    const getDelayMs = (idx: number): number => {
      return (idx + 1) * 200;
    };

    return (
      <div
        className={`relative pl-8 pb-8 ${
          isVisible.experience
            ? "translate-x-0 opacity-100"
            : "-translate-x-20 opacity-0"
        }`}
        style={{
          transition: "all 0.6s ease-out",
          transitionDelay: `${getDelayMs(index)}ms`,
        }}
      >
        <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 z-10" />
        <div className="absolute left-2 top-4 w-0.5 bg-gradient-to-b from-blue-500 to-transparent h-full" />
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
          <h3 className="text-lg font-bold text-white mb-1">
            {exp.role}
          </h3>
          <p className="text-blue-400 font-medium mb-2">
            {exp.company}
          </p>
          <p className="text-sm text-gray-400 mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {exp.period}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {exp.description}
          </p>
        </div>
      </div>
    );
  };

  const ScrollIndicator = () => (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <ChevronDown className="w-6 h-6 text-blue-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <InteractiveBackground />
      <FloatingParticles />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Anshuman Kansana
            </h1>
            <div className="hidden md:flex space-x-8">
              {[
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto px-6">
          <Interactive3DLogo mousePosition={mousePosition} />

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Anshuman Kansana
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
            Full-Stack Developer & Software Developer
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "JavaScript",
              "React.js",
              "Python",
              "AWS",
              "Machine Learning",
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:anshumankansana@gmail.com"
              className="group flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>Get In Touch</span>
            </a>
            <a
              href="https://github.com/anshumankansana"
              className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Github className="w-5 h-5 group-hover:animate-bounce" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/AnshumanKansana"
              className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Linkedin className="w-5 h-5 group-hover:animate-bounce" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.about
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transform transition-all duration-1000 delay-300 ${
                isVisible.about
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate B.Tech Computer Science
                graduate from ITM University, Gwalior, with a
                strong foundation in full-stack development and
                emerging technologies. With hands-on experience
                across multiple internships, I've built scalable
                web applications, worked with cloud
                technologies, and explored the fascinating world
                of machine learning.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey spans from frontend React
                applications to backend APIs, from traditional
                databases to cloud infrastructure. I believe in
                creating meaningful, user-centered solutions
                that make a real impact.
              </p>
              <div className="flex items-center space-x-4 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Gwalior, India</span>
                <Phone className="w-5 h-5 ml-6" />
                <span>+91-7223069582</span>
              </div>
            </div>
            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible.about
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-400" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-400">
                      B.Tech Computer Science
                    </h4>
                    <p className="text-gray-300">
                      ITM University, Gwalior
                    </p>
                    <p className="text-sm text-gray-400">
                      2021 – 2025 
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400">
                      12th Grade (PCM)
                    </h4>
                    <p className="text-gray-300">
                      Pragati Vidhya Peeth, Gwalior
                    </p>
                    <p className="text-sm text-gray-400">
                      2020 – 2021 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 bg-gray-800/30 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.experience
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            Professional Experience
          </h2>
          <div className="relative">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.projects
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-gray-800/30 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.skills
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible.skills
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Frontend
                </h3>
                <p className="text-gray-400">
                  React.js, HTML/CSS, Bootstrap, Responsive
                  Design
                </p>
              </div>
            </div>
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible.skills
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                <Server className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Backend
                </h3>
                <p className="text-gray-400">
                  Node.js, Python, APIs, AWS Cloud Services
                </p>
              </div>
            </div>
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible.skills
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Database
                </h3>
                <p className="text-gray-400">
                  MongoDB, MySQL, Data Optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className={`text-4xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            Let's Connect
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href="mailto:anshumankansana@gmail.com"
              className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 ${
                isVisible.contact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <Mail className="w-10 h-10 text-blue-400 mx-auto mb-3 group-hover:animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">
                Email
              </h3>
              <p className="text-gray-400 text-sm break-all text-center px-2">
                anshumankansana@gmail.com
              </p>
            </a>

            <a
              href="tel:+917223069582"
              className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 ${
                isVisible.contact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <Phone className="w-10 h-10 text-green-400 mx-auto mb-3 group-hover:animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">
                Phone
              </h3>
              <p className="text-gray-400 text-sm text-center">
                +91-7223069582
              </p>
            </a>

            <a
              href="https://github.com/anshumankansana"
              className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 transform hover:scale-105 ${
                isVisible.contact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Github className="w-10 h-10 text-orange-400 mx-auto mb-3 group-hover:animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">
                GitHub
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Code Repository
              </p>
            </a>

            <a
              href="https://linkedin.com/in/AnshumanKansana"
              className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-105 ${
                isVisible.contact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Linkedin className="w-10 h-10 text-purple-400 mx-auto mb-3 group-hover:animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">
                LinkedIn
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Professional Profile
              </p>
            </a>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-xl text-gray-300 mb-8">
              Ready to collaborate on exciting projects and
              bring innovative ideas to life!
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
              <div className="bg-gray-900 rounded-full px-8 py-3">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                  Open for Full-time Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Anshuman Kansana. Built with React.js and
            passion for great user experiences.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;