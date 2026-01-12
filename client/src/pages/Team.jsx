import React, { useState, useEffect, useRef } from "react";
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import teamData from "../data/teamData.json";

const Team = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.1 }
      );
      
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        /* Ensure z-index hierarchy for navigation */
        .ant-layout-sider,
        header,
        nav {
          position: relative;
          z-index: 1000 !important;
        }
        
        /* Make sure links are clickable */
        a {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        
        button {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
      `}</style>

      <div className="min-h-screen bg-black relative overflow-hidden" style={{ fontFamily: "'Urbanist', sans-serif" }}>
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <CustomSidebar />
        </div>

        {/* Animated Grid Background */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              left: `${mousePosition.x / 20}px`,
              top: `${mousePosition.y / 20}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease-out',
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-32 sm:pt-40 sm:pb-48">
            <div 
              ref={el => observerRefs.current[0] = el}
              className={`text-center transition-all duration-1500 ${
                isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Hero Title */}
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Meet the
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Founding Team
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-2xl opacity-30 -z-10"></div>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16 tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                Our founding team is united by a shared <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">vision and passion</span> for innovation and the startup ecosystem
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-500/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        </section>

        {/* Mission Statement */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div 
            ref={el => observerRefs.current[1] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Glowing Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 rounded-[2.5rem] opacity-50 blur-2xl"></div>
            
            {/* Card Content */}
            <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-12 sm:p-16 border border-white/30 dark:border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Vision</h2>
              </div>
              <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed max-w-5xl" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                We are dedicated to supporting founders who are determined to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">challenge the status quo</span> and make the world a better place. Together, we bring a diverse set of skills and experiences, all focused on fostering innovation and empowering entrepreneurs.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member, index) => (
              <div 
                key={index}
                ref={el => observerRefs.current[index + 2] = el}
                className={`relative transition-all duration-1000 ${
                  isVisible[index + 2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Content */}
                <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/30 dark:border-white/20 overflow-hidden shadow-2xl">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img 
                      src={member.imgSrc}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-blue-400 font-bold mb-4 text-lg" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '600' }}>
                      {member.role}
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                      {member.bio}
                    </p>
                    
                    {/* LinkedIn Button */}
                    <a 
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 font-bold transition-all duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '600' }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>
                        Connect on LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Values Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[teamData.length + 2] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[teamData.length + 2] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Glowing Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-[2.5rem] opacity-50 blur-2xl"></div>
            
            {/* Values Container */}
            <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-12 sm:p-16 border border-white/30 dark:border-white/20 shadow-2xl">
              <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Our Core Values
              </h2>
              
              <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Innovation</h3>
                  <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                    Pushing boundaries and embracing new ideas to drive progress
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Collaboration</h3>
                  <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                    Working together with founders to achieve extraordinary results
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Integrity</h3>
                  <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                    Building trust through transparency and ethical practices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[teamData.length + 3] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[teamData.length + 3] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Glowing Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-[2.5rem] opacity-50 blur-2xl"></div>
            
            {/* Footer Card Content */}
            <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-12 sm:p-16 border border-white/30 dark:border-white/20 shadow-2xl text-center">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-5xl mx-auto" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                Together, we bring a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">diverse set of skills and experiences</span>, all focused on fostering{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">innovation and empowering entrepreneurs</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Particles Effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1000 }}>
          <Footer />
        </div>
      </div>

      {/* Add Custom Animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </>
  );
};

export default Team;