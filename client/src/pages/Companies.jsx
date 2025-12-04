import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CustomSidebar from "../components/Sidebar";
import CompanyTable from "../Admin-page/company-settings/CompanyTable";
import Footer from "../components/Footer";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .get("https://plantaintree-app-server.vercel.app/companies")
      .then((response) => {
        setCompanies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 sm:pt-40 sm:pb-32">
            <div 
              ref={el => observerRefs.current[0] = el}
              className={`text-center transition-all duration-1500 ${
                isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Glowing Badge */}
              <div className="inline-block mb-8 relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative text-xs font-black tracking-[0.4em] text-blue-400 uppercase bg-gradient-to-r from-blue-950 to-cyan-950 px-8 py-3 rounded-full border border-blue-500/50 backdrop-blur-sm shadow-lg shadow-blue-500/20" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '0.3em' }}>
                  ✨ Companies
                </span>
              </div>
              
              {/* Hero Title */}
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Our{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Portfolio
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-2xl opacity-30 -z-10"></div>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light tracking-wide" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                We are proud to be the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">early investors</span> in these startups.
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        </section>

        {/* Table Section */}
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
            <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-12 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Portfolio Companies</h2>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <CompanyTable companies={companies} showAdminColumns={false} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer Card Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div 
            ref={el => observerRefs.current[2] = el}
            className={`relative transition-all duration-1500 ${
              isVisible[2] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Glowing Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-[2.5rem] opacity-50 blur-2xl"></div>
            
            {/* Footer Card Content */}
            <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-[2.5rem] p-12 sm:p-16 border border-gray-700/50 shadow-2xl text-center">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-5xl mx-auto" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: '300' }}>
                Each of these companies represents a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">unique opportunity</span> and a
                promising venture that aligns with our commitment to supporting{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">strong founding teams</span> and innovative solutions. We are excited to see their
                continued growth and impact in their respective industries.
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

export default CompaniesTable;