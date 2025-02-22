import React from "react";
import {
  Wand2,
  Sparkles,
  Bot,
  FormInput as Forms,
  Zap,
  Shield,
  Palette,
} from "lucide-react";

function FloatingIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`absolute text-emerald-400/30 animate-float ${className}`}>
      {children}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#1A1A1F] p-6 rounded-2xl border border-emerald-700/30 backdrop-blur-lg shadow-lg transition-transform hover:scale-105">
      <div className="text-emerald-500 mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden font-poppins">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-emerald-500/10 w-40 h-40 rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 2 + 1})`,
                animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <FloatingIcon className="top-16 left-16">
          <Wand2 size={48} />
        </FloatingIcon>
        <FloatingIcon className="bottom-16 right-16 animation-delay-2000">
          <Sparkles size={48} />
        </FloatingIcon>
        <FloatingIcon className="top-16 right-16 animation-delay-1000">
          <Bot size={48} />
        </FloatingIcon>
        <FloatingIcon className="bottom-16 left-16 animation-delay-3000">
          <Forms size={48} />
        </FloatingIcon>

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4 relative z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-transparent bg-clip-text tracking-tight drop-shadow-lg">
              Form Craft
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Build powerful forms with the magic of artificial intelligence
            </p>
            <a href='/login'  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full text-white text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30">
              Start Building →
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title="AI-Powered Generation"
            description="Create complex forms in seconds using advanced AI that understands your requirements."
          />
          <FeatureCard
            icon={Shield}
            title="Built-in Validation"
            description="Smart validation rules that adapt to your data needs and ensure data integrity."
          />
          <FeatureCard
            icon={Palette}
            title="Custom Styling"
            description="Fully customizable themes and styles to match your brand identity perfectly."
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent" />
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-teal-900/30 rounded-full blur-3xl" />
    </div>
  );
}

export default App;
