"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const [showModel, setShowModel] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-[#e8dada]">
      {!showModel ? (
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-[#6d4848]">
            cozy<span className="mx-1">🐨</span>bear
          </h1>
          <h2 className="text-xl md:text-2xl text-[#6d4848]">✨ berni bean koala bear ✨</h2>
          <Button
            onClick={() => setShowModel(true)}
            className="mt-8 bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-8 py-6 uppercase tracking-wider font-medium"
          >
            Welcome to the stash
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <Button onClick={() => setShowModel(false)} className="mb-4 bg-[#6d4848] hover:bg-[#5a3a3a] text-white">
            Back to Home
          </Button>

          <div className="flex items-center justify-center mb-4 p-3 bg-amber-100 border border-amber-300 rounded-md text-amber-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Note: Currently showing a duck model as a placeholder. A real koala model would need to be imported.
            </p>
          </div>

          <div className="w-full h-[500px] md:h-[600px] bg-transparent rounded-lg overflow-hidden">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-[#6d4848]">Loading 3D Model...</div>
              }
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <color attach="background" args={["#e8dada"]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Environment preset="forest" />
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  config={{ mass: 2, tension: 500 }}
                  snap={{ mass: 4, tension: 1500 }}
                >
                  <group position={[0, -1, 0]} scale={2}>
                    <DuckModel />
                    <Html position={[0, 1.5, 0]} center distanceFactor={8}>
                      <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
                        <p className="text-[#6d4848] text-sm whitespace-nowrap">🦆 Duck (Koala placeholder)</p>
                      </div>
                    </Html>
                  </group>
                </PresentationControls>
                <ContactShadows position={[0, -2, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
              </Canvas>
            </Suspense>
          </div>

          <div className="mt-6 text-center text-[#6d4848]">
            <p className="mb-4">Interact with the 3D model by:</p>
            <ul className="text-left inline-block">
              <li className="mb-2">• Drag to rotate the view</li>
              <li className="mb-2">• Pinch or scroll to zoom</li>
              <li>• Click on the model to interact</li>
            </ul>
            <div className="mt-6">
              <Button
                onClick={() => document.getElementById("sound")?.play()}
                className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white"
              >
                Make Sound
              </Button>
              <audio id="sound" src="/koala-sound.mp3" preload="auto"></audio>
            </div>

            <div className="mt-8 p-4 bg-white/50 rounded-lg max-w-md mx-auto">
              <h3 className="font-medium mb-2">To use a real koala model:</h3>
              <p className="text-sm text-[#6d4848] mb-2">
                You would need to import a 3D koala model (.glb or .gltf format) from sources like:
              </p>
              <ul className="text-sm text-left list-disc pl-5 space-y-1">
                <li>Sketchfab</li>
                <li>TurboSquid</li>
                <li>CGTrader</li>
                <li>Or commission a custom 3D model</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function DuckModel() {
  // Using the duck model as a placeholder
  const { scene } = useGLTF("/assets/3d/duck.glb")

  const handleClick = () => {
    alert("Quack! (This would be a koala sound with a real koala model) 🦆")
  }

  return <primitive object={scene} onClick={handleClick} />
}
