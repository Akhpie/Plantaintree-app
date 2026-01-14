import React, { useEffect, useRef, useState } from 'react';
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import plantainlogo from "../pages/images/plantain-icon-main.png";

const About = () => {
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
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-24 sm:pt-32 sm:pb-32">
            <div 
              ref={el => observerRefs.current[0] = el}
              className={`text-center transition-all duration-1500 ${
                isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Hero Title */}
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Empowering Innovation
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Through Vision
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-2xl opacity-30 -z-10"></div>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16 tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                We are an early-stage investment firm dedicated to supporting startups at the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">pre-seed and seed stages</span> of their journey, 
                backing innovative founders with transformative potential.
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-500/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        </section>

        {/* Mission Statement Card */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div 
            ref={el => observerRefs.current[1] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Glowing Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-[2.5rem] opacity-50 blur-2xl"></div>
            
            {/* Card Content */}
            <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-12 sm:p-16 border border-white/30 dark:border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Mission</h2>
              </div>
              <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed max-w-5xl" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                Our primary goal is to identify and back{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">innovative founders and ventures</span> that are in 
                their formative stages but have the potential for significant growth. We believe in the 
                power of great ideas combined with exceptional execution.
              </p>
            </div>
          </div>
        </section>

        {/* Investment Approach Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
          <div 
            ref={el => observerRefs.current[2] = el}
            className={`text-center mb-20 transition-all duration-1500 ${
              isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Investment Approach
              </span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full mx-auto shadow-lg shadow-blue-500/50 mb-6"></div>
            <p className="text-xl text-gray-400" style={{ fontFamily: "'Urbanist', sans-serif" }}>Building the future, one founder at a time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Sector-Agnostic Card */}
            <div 
              ref={el => observerRefs.current[3] = el}
              className={`relative transition-all duration-1000 ${
                isVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-3xl rounded-3xl p-10 sm:p-12 border border-white/20 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Sector-Agnostic
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg shadow-blue-500/50"></div>
                </div>
                <p className="text-lg text-gray-400 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                  Our focus is on identifying and backing startups with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">strong founding teams</span> that 
                  are dedicated to addressing genuine pain points and delivering real value to customers.
                </p>
              </div>
            </div>

            {/* Founding Team Card */}
            <div 
              ref={el => observerRefs.current[4] = el}
              className={`relative transition-all duration-1000 ${
                isVisible[4] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-3xl rounded-3xl p-10 sm:p-12 border border-white/20 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Founding Team
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-purple-500/50"></div>
                </div>
                <p className="text-lg text-gray-400 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                  We believe that the strength of the founding team is crucial, as it drives the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">vision, resilience, and execution</span> necessary 
                  for a startup's success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with Enhanced Glass Morphism */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[5] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Enhanced Glass Morphism Container */}
            <div className="relative bg-white/15 dark:bg-white/8 backdrop-blur-2xl rounded-2xl p-16 sm:p-24 border border-white/25 dark:border-white/15 shadow-2xl" 
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              }}>
              <div className="grid sm:grid-cols-3 gap-16 text-center">
                {/* Stat 1 */}
                <div className="relative">
                  <div className="relative text-7xl sm:text-8xl font-black mb-6 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#06B6D4',
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)'
                    }}>
                    100%
                  </div>
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Founder-First Approach</div>
                </div>
                
                {/* Stat 2 */}
                <div className="relative">
                  <div className="relative text-7xl sm:text-8xl font-black mb-6 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#EC4899',
                      textShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)'
                    }}>
                    Early
                  </div>
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Stage Focus</div>
                </div>
                
                {/* Stat 3 */}
                <div className="relative">
                  <div className="relative text-7xl sm:text-8xl font-black mb-6 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#06B6D4',
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)'
                    }}>
                    ∞
                  </div>
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Growth Potential</div>
                </div>
              </div>
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

export default About;