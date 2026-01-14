import React, { useState, useEffect, useRef } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import companyData from "../data/companyData.json";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRefs = useRef([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 576px)" });

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
              {/* Hero Title with Advanced Gradient */}
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Welcome to Our
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Venture
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 -z-10"></div>
                </span>
              </h1>
              
              {/* Glowing Subtitle */}
              <p className="text-xl sm:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16 tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">innovation</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">success</span> through strategic investments
              </p>

              {/* CTA Buttons with Enhanced Effects */}
              <div className="flex flex-wrap justify-center gap-6">
                <StyledLink to="/companies">
                  <button className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700' }}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0"></span>
                    <span className="relative flex items-center gap-3">
                      View Portfolio
                      <ArrowRightOutlined className="text-base" />
                    </span>
                  </button>
                </StyledLink>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg rotate-45 animate-pulse"></div>
        </section>

        {/* Portfolio Section with Glass Morphism */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[1] = el}
            className={`text-center mb-20 transition-all duration-1500 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Early Investors In
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full mx-auto shadow-lg shadow-blue-500/50"></div>
          </div>

          {/* Company Cards with Glass Morphism Effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {companyData.map((company, index) => (
              <div 
                key={index}
                ref={el => observerRefs.current[index + 2] = el}
                className={`relative transition-all duration-1000 ${
                  isVisible[index + 2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Content with Glass Morphism */}
                <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-3xl rounded-3xl p-10 border border-white/30 dark:border-white/20 h-full flex flex-col shadow-2xl">
                  {/* Logo Container */}
                  <div className="flex items-center justify-center mb-8 h-28 relative">
                    <img 
                      src={company.logoSrc}
                      alt={company.name}
                      className="relative max-h-full max-w-full object-contain filter drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-3xl font-black text-white text-center mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {company.name}
                  </h3>
                  
                  {/* Description 
                  <p className="text-gray-300 text-center text-base leading-relaxed flex-grow" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '400' }}>
                    {company.description}
                  </p>
                  */}
                  {/* Website Link */}
                  {company.website && (
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 text-blue-300 font-bold text-center flex items-center justify-center gap-3"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '600' }}
                    >
                      <span>Visit Website</span>
                      <ArrowRightOutlined className="text-base" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* All Companies CTA with Premium Design */}
          <div 
            ref={el => observerRefs.current[companyData.length + 2] = el}
            className={`text-center transition-all duration-1500 ${
              isVisible[companyData.length + 2] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <StyledLink to="/companies">
              <div className="relative inline-block cursor-pointer">
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl opacity-75 blur-xl animate-pulse"></div>
                
                {/* Card Content */}
                <div className="relative bg-white/20 dark:bg-white/10 rounded-3xl p-12 sm:p-16 backdrop-blur-3xl border border-white/30 dark:border-white/20">
                  <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    All Companies
                    <ArrowRightOutlined className="text-3xl" />
                  </h3>
                  <p className="text-gray-400 text-xl" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                    Explore our complete portfolio of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">innovative startups</span>
                  </p>
                </div>
              </div>
            </StyledLink>
          </div>
        </section>

        {/* Stats Section with Enhanced Glass Morphism */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[companyData.length + 3] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[companyData.length + 3] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
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
                    {Math.max(companyData.length, 12)}+
                  </div>
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Portfolio Companies</div>
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
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Stage Investment</div>
                </div>
                
                {/* Stat 3 */}
                <div className="relative">
                  <div className="relative text-7xl sm:text-8xl font-black mb-6 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#06B6D4',
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)'
                    }}>
                    100%
                  </div>
                  <div className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '600' }}>Founder Focused</div>
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

export default Home;