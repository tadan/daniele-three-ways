import { useEffect, useRef } from 'react'
import p5 from 'p5'

const DriveAnimation = () => {
    const sketchRef = useRef<HTMLDivElement>(null)
    const p5Instance = useRef<p5 | null>(null)

    useEffect(() => {
        if (!sketchRef.current) return

        const sketch = (p: p5) => {
            const rings: Array<{
                radius: number
                rotation: number
                speed: number
                opacity: number
            }> = []

            p.setup = () => {
                const isMobile = p.windowWidth < 768
                const width = isMobile ? p.windowWidth : p.windowWidth / 3
                canvasElt = p.createCanvas(width, p.windowHeight)
                if (isMobile) {
                    // Center the canvas on mobile
                    canvasElt.position((p.windowWidth - width) / 2, 0)
                }
                p.noFill()

                // Create concentric rings like tree rings/hard drive platters
                for (let i = 0; i < 8; i++) {
                    rings.push({
                        radius: 50 + i * 40,
                        rotation: 0,
                        speed: 0.002 + i * 0.0005,
                        opacity: 0.3 + i * 0.05, // Increased base opacity
                    })
                }
            }

            p.draw = () => {
                p.clear()
                p.translate(p.width / 2, p.height / 2)

                rings.forEach((ring) => {
                    p.colorMode(p.HSL)
                    p.stroke(280, 70, 60, ring.opacity * 255) // Adjusted HSL values
                    p.strokeWeight(2) // Increased stroke weight for visibility

                    p.push()
                    p.rotate(ring.rotation)

                    // Draw organic tree ring with subtle variations
                    p.beginShape()
                    for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
                        const noise =
                            p.noise(
                                angle * 2,
                                ring.radius * 0.01,
                                p.frameCount * 0.01
                            ) * 10
                        const x = (ring.radius + noise) * p.cos(angle)
                        const y = (ring.radius + noise) * p.sin(angle)
                        p.vertex(x, y)
                    }
                    p.endShape(p.CLOSE)

                    // Add radial lines like hard drive sectors
                    for (let i = 0; i < 12; i++) {
                        const angle = (i / 12) * p.TWO_PI
                        const startRadius = ring.radius - 15
                        const endRadius = ring.radius + 15
                        p.line(
                            startRadius * p.cos(angle),
                            startRadius * p.sin(angle),
                            endRadius * p.cos(angle),
                            endRadius * p.sin(angle)
                        )
                    }

                    p.pop()

                    ring.rotation += ring.speed
                })
            }

            let canvasElt: p5.Renderer

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
            style={{
                background: 'transparent',
            }}
        />
    )
}

export default DriveAnimation
