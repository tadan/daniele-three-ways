import DriveAnimation from '@/components/animations/DriveAnimation';
import WorkAnimation from '@/components/animations/WorkAnimation';
import HomeAnimation from '@/components/animations/HomeAnimation';

const Index = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      {/* Drive Section */}
      <section className="bg-gradient-drive min-h-screen md:min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        <DriveAnimation />
        <div className="text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight">
            drive
          </h1>
          <a 
            href="https://drive.daniele.is" 
            className="text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4"
          >
            drive.daniele.is
          </a>
        </div>
      </section>

      {/* Work Section */}
      <section className="bg-gradient-work min-h-screen md:min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        <WorkAnimation />
        <div className="text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight">
            work
          </h1>
          <a 
            href="https://work.daniele.is" 
            className="text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4"
          >
            work.daniele.is
          </a>
        </div>
      </section>

      {/* Home Section */}
      <section className="bg-gradient-home min-h-screen md:min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        <HomeAnimation />
        <div className="text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight">
            home
          </h1>
          <a 
            href="https://home.daniele.is" 
            className="text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4"
          >
            home.daniele.is
          </a>
        </div>
      </section>
    </main>
  );
};

export default Index;
