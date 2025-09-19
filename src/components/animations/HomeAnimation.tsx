import { useEffect, useRef } from 'react'
import p5 from 'p5'

const HomeAnimation = () => {
    const sketchRef = useRef<HTMLDivElement>(null)
    const p5Instance = useRef<p5 | null>(null)

    useEffect(() => {
        if (!sketchRef.current) return

        const sketch = (p: p5) => {
            const particles: Array<{
                x: number
                y: number
                vx: number
                vy: number
                life: number
                maxLife: number
            }> = []
            let time = 0

            let canvasElt: p5.Renderer

            p.setup = () => {
                const isMobile = p.windowWidth < 768
                const width = isMobile ? p.windowWidth : p.windowWidth / 3
                canvasElt = p.createCanvas(width, p.windowHeight)
                if (isMobile) {
                    // Center the canvas on mobile
                    canvasElt.position((p.windowWidth - width) / 2, 0)
                }
            }

            p.draw = () => {
                p.clear()
                time += 0.008

                // Add new particles (like seeds, pollen, life)
                if (p.frameCount % 8 === 0) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.height + 10,
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-2, -0.5),
                        life: 0,
                        maxLife: p.random(200, 400),
                    })
                }

                // Update and draw particles
                for (let i = particles.length - 1; i >= 0; i--) {
                    const particle = particles[i]

                    // Organic movement like wind through leaves
                    particle.x +=
                        particle.vx + p.sin(time + particle.y * 0.01) * 0.5
                    particle.y += particle.vy
                    particle.life++

                    // Fade in and out
                    const alpha =
                        particle.life < particle.maxLife * 0.1
                            ? particle.life / (particle.maxLife * 0.1)
                            : particle.life > particle.maxLife * 0.9
                            ? 1 -
                              (particle.life - particle.maxLife * 0.9) /
                                  (particle.maxLife * 0.1)
                            : 1

                    // Draw as organic shapes representing nature
                    p.colorMode(p.HSL)
                    p.fill(25, 70, 60, alpha * 255) // Orange in HSL
                    p.noStroke()

                    const size = 3 + p.sin(particle.life * 0.1) * 2

                    // Draw leaf-like shapes
                    p.push()
                    p.translate(particle.x, particle.y)
                    p.rotate(particle.vx + time)
                    p.beginShape()
                    for (let angle = 0; angle < p.TWO_PI; angle += 0.5) {
                        const radius = size * (1 + p.sin(angle * 3) * 0.3)
                        const x = radius * p.cos(angle)
                        const y = radius * p.sin(angle)
                        p.vertex(x, y)
                    }
                    p.endShape(p.CLOSE)
                    p.pop()

                    // Remove dead particles
                    if (particle.life > particle.maxLife || particle.y < -10) {
                        particles.splice(i, 1)
                    }
                }

                // Draw flowing lines like streams or wind patterns
                p.colorMode(p.HSL)
                p.stroke(31, 70, 60, 0.3 * 255) // Adjusted HSL values
                p.strokeWeight(2)
                p.noFill()

                for (let y = 0; y < p.height; y += 60) {
                    p.beginShape()
                    for (let x = 0; x < p.width; x += 10) {
                        const wave = p.sin(x * 0.01 + time + y * 0.01) * 30
                        p.vertex(x, y + wave)
                    }
                    p.endShape()
                }
            }

            p.windowResized = () => {
                const isMobile = p.windowWidth < 768
                const width = isMobile ? p.windowWidth : p.windowWidth / 3
                p.resizeCanvas(width, p.windowHeight)
                if (isMobile) {
                    // Center the canvas on mobile
                    canvasElt.position((p.windowWidth - width) / 2, 0)
                } else {
                    canvasElt.position(0, 0)
                }
            }
        }

        p5Instance.current = new p5(sketch, sketchRef.current)

        return () => {
            if (p5Instance.current) {
                p5Instance.current.remove()
            }
        }
    }, [])

    return (
        <div
            ref={sketchRef}
            className='absolute inset-0 z-0'
            style={{ background: 'transparent' }}
        />
    )
}

export default HomeAnimation
