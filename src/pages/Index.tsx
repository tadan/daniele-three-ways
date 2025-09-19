import React from 'react'
const DriveAnimation = lazy(() =>
    import('@/components/animations/DriveAnimation')
)
const WorkAnimation = lazy(() =>
    import('@/components/animations/WorkAnimation')
)
const HomeAnimation = lazy(() =>
    import('@/components/animations/HomeAnimation')
)

const Index = () => {
    return (
        <main className='h-screen grid grid-cols-1 md:grid-cols-3 overflow-hidden'>
            {/* Drive Section */}
            <section className='bg-gradient-drive h-[33.333vh] md:h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative'>
                <DriveAnimation />
                <div className='text-center relative z-10'>
                    <a
                        href='https://drive.daniele.is'
                        className='text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4'
                    >
                        <h1 className='text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight'>
                            drive
                        </h1>
                    </a>
                </div>
            </section>

            {/* Work Section */}
            <section className='bg-gradient-work h-[33.333vh] md:h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative'>
                <WorkAnimation />
                <div className='text-center relative z-10'>
                    <a
                        href='https://work.daniele.is'
                        className='text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4'
                    >
                        <h1 className='text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight'>
                            work
                        </h1>
                    </a>
                </div>
            </section>

            {/* Home Section */}
            <section className='bg-gradient-home h-[33.333vh] md:h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] relative'>
                <HomeAnimation />
                <div className='text-center relative z-10'>
                    <a
                        href='https://home.daniele.is'
                        className='text-xl md:text-2xl text-section-text-secondary hover:text-section-text transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-4'
                    >
                        <h1 className='text-6xl md:text-8xl font-bold text-section-text mb-8 tracking-tight'>
                            home
                        </h1>
                    </a>
                </div>
            </section>
        </main>
    )
}

export default Index
function lazy<T extends React.ComponentType<unknown>>(
    importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
    return React.lazy(importFn)
}
