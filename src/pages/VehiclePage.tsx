"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TabNavigation from "@/components/tab-navigation"
import VerticalScroller from "@/components/vertical-scroller"
import PlayPauseButton from "@/components/play-pause-button"

type PassengerVideos = {
  complete: string
  front: string
  cabin: string
  trunk: string
  exterior: string
}

type CommercialVideos = {
  complete: string
}

type SectionData = {
  passenger: {
    title: string
    description: string
    videos: PassengerVideos
  }
  commercial: {
    title: string
    description: string
    videos: CommercialVideos
  }
}

export default function VehiclePage() {
  const [activeSection, setActiveSection] = useState<"passenger" | "commercial">("passenger")
  const [activeTab, setActiveTab] = useState<"complete" | "front" | "cabin" | "trunk" | "exterior">("complete")
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showClickText, setShowClickText] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const lastTabRef = useRef<string>(`${activeSection}-${activeTab}`)

  // Vehicle sections data
  const sections: SectionData = {
    passenger: {
      title: "Passenger vehicles",
      description: "Revving up Nonwoven innovation from interior to exterior.",
      videos: {
        complete:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/a781/baf7/-bd13-4a3e-81a0-1bd2ddcef3ef?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pt1HQJm~xT~V-2iYPibeqvCohHBSvxvXs9ZeKGW4pOpYrIWPd1RbO-xLfLGXM2o~r0Q8bGaZt0CcjjKrcqulT3xOJ8J3Zc8mOtVZP8f8rG9JCd54Ph~9jd53avCoTdHS9oScVSidW7xcERN6-cC7GIDXrY-2SDmEPOhnb6Dm0dA~TZ56gRhc-TFc16YUl2yU8V45pLXYTpYI5OUYix5GkdLbzoj7~5G9lQ88TQvcPUoWoC~QCY3D2PVCrOX6PTCE8Cfz3CtXuD3xeVKVJltHLs~MZBFcAtbbLW54NebRUsHC1aFNxrDzd1dCjtteD7dltNsg8kQYUUP-DVf6WI1zTw__",
        front:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/b026/9297/-1976-4d99-9817-49cf83fc464f?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QqZu6D99JYUQzkDvDKkhGLf4c4OE-U7q-5s15KuyHZEQE3QikEtYs9xFGp064KVr5TNzYoFJZNk2tioSb-T~PJ0bQD4wYeGX-O~uNbMDRFPukZf70u4UNTSOEgg087wcpe5C5vQ82Xim0qZtC8q3bHcRcUQQa~v4s0yXLKLGeq-Rxo2ChgCG6dmitXRwo6OI7A7opBhV1~wHeKltBdmKlRIhcc8Y7~-pprOXKiey8rCxSVhxd4PhzRjWcV75ESL-SOl2AjWUD8ltZje5p-hJEw-OOAMikXaiixVdLWCJqOGMrB1AkruZpj30LtF0E7Clp610~KqmYYDI~dIqqJQmdA__",
        cabin:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/6761/32c5/-5a7d-4558-aeff-0d93f98334ad?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VwTtjaMGLzNlkpH-3DvKVQHUke5CrCMbblwmjhB-lDUOwk8clzroekLdcrou2ejzJvop~hVtGq3iBD4-oowxDjSuJydnbv88Dq52e-k03KzIu3Iyz0TBPqoGC0jOEDgwZnXCD19b-3G~y9QotWojJfkAUMmL1XuYqcApZ0NpoQ0nBlnNSE2ZNC9PAASkxiydCRRVjw97a-zmwaSR6q6YwLc32bh-b8CXHt0Jsk2~3RXP15ujMIJhTdEYo2bUrVTRGqCz-RogI81FgE3376FYQF8WcwVCWjQROhdUoH25f9z5VOosahYu64lGVRRrzeCDm7NreWshVnqb50CdBk9nog__",
        trunk:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/638d/bf77/-5723-48e0-ad7d-5233a3d2cc40?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bJsKqYqHDtocHkNIcjCVPcTUa6tJSXEW1OBcs5dGM5tURpppuib-PfkT0O2lyTtRWi8oNkhIAt4Aq5mZijF7aQXrqOSqwUEOKmWQRnrcEYTFok86YQWVZRKWAsC583E6ErUvsP~4F1nXaaWUnbRt2s-dhELWZz9UaQ4N1JsVrR54JD3amaj7uRxZ6KniPmuaM9Jgx8CGKMczEizqS38unt3dVMdBdPxqeFy96-OfHdPvCVmm7ljCg0cfYnsGy2U6PJsQPBQu~Pf~Thgz-iunR1IEFUvKkYHhzVgy~Yn6r-XzOYq8~xqfRpfbytGabTr-UiDADRC4lY~gv7~dwNq11g__",
        exterior:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/5c03/8fd3/-81de-4ba3-8fa6-6b76c1ea6995?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t5n6ReXMCCTB0KKSriuCKdfNTkGxwtW1U-YwP~n0gFQur9~3NVZmheyi~VJlyF00gGsbGum7TI0O1AHBZKRZZs-xTZBr~IkZsDsnqaxTgG5BIb0k7zBwOP5OAlreJKrEhw63bWMvcRp73U2cGHLsDmqOja307hYgeJqvvAXPd80xSBl4Yl0u7TGRHzoZjHu8QWaeXX44Kp5AISUFMoAnKPozZUp8pI4UrwRY3tKC~JVrBiWKGbiE~bKUN25Nxc~rNbINxcmYESfjj7SGev1dC7lApI8roOGuTLzZ1BRAKwNqhZMj5mbp8kahyS83pAs9~JXtGOEcMsuoM8n2aJruuQ__",
      },
    },
    commercial: {
      title: "Commercial vehicles",
      description: "Advancing Nonwoven engineering for heavy-duty vehicles.",
      videos: {
        complete:
          "https://s3-figma-videos-production-sig.figma.com/video/1173956211076479877/TEAM/9795/46ac/-303d-445d-a93e-c25b0e48c495?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YjK9-ZAKD0aoD6k0~3uBawEcEk2D9A4qhISy9UhzURJcZixvv1s9P~yNYzij7S3jPoV6BFVf8z3QZV3UkGYss~B~X6diiORp55PBoOGUivC7SNX5FcKps2lOlgeXV-OOZQatg8LAog04N87~jvaLZV5QGNKABbjKrbhrodzcbjscHloKKG4L4XIuI7CQrMfV3ficdQCIDF8J5sk~rtQEU9UAQwr7wbULXDlNygb-gclDKEb4ymdonPzQfmtn6K-owq2n3hbXlwPy83MjHa8Po2qnfrntIc3HF6r1Nw7oFbwgEYVOTcoqW8Mmzxx0uh5HXE0qEzNOePY91SaAXFdV0w__",
      },
    },
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const currentTabKey = `${activeSection}-${activeTab}`
    if (lastTabRef.current !== currentTabKey) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        setCurrentTime(0)
        setVideoDuration(0) 
      }
      lastTabRef.current = currentTabKey
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((e) => console.error("Video play error:", e))
      } else {
        videoRef.current.pause()
      }
    }
  }, [activeTab, activeSection, isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleMetadataLoaded = () => {
      setVideoDuration(video.duration)
    }

    const handleDurationChange = () => {
      setVideoDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleMetadataLoaded)
    video.addEventListener("durationchange", handleDurationChange)

    if (video.duration) setVideoDuration(video.duration)
    if (video.currentTime) setCurrentTime(video.currentTime)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleMetadataLoaded)
      video.removeEventListener("durationchange", handleDurationChange)
    }
  }, [])

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((e) => console.error("Video play error:", e))
      }
    }
  }

  const handleSectionChange = (section: "passenger" | "commercial") => {
    setActiveSection(section)
    setActiveTab("complete")
    setCurrentTime(0)
    setVideoDuration(0)
  }

  const handleTabChange = (tab: "complete" | "front" | "cabin" | "trunk" | "exterior") => {
    setActiveTab(tab)
    setCurrentTime(0)
    setVideoDuration(0)
  }

  const handleClick = () => {
    setTimeout(() => {
      setShowClickText(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black" onClick={handleClick}>
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-white text-center">
            <span className="font-light text-[48px] leading-[100%] tracking-[-0.5%] block md:inline">
              Evolving the drive with{" "}
            </span>
            <span className="font-semibold text-[48px] leading-[100%] tracking-[-0.5%]">360-degree</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-light text-[48px] leading-[100%] tracking-[-0.5%] text-white text-center mt-0"
          >
            nonwoven solutions
          </motion.p>
        </motion.div>


        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

          <motion.div
            className="md:w-1/3 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VerticalScroller
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              sections={[
                {
                  id: "passenger",
                  title: "Passenger vehicles",
                  description: "Revving up Nonwoven innovation from interior to exterior.",
                },
                {
                  id: "commercial",
                  title: "Commercial vehicles",
                  description: "Advancing Nonwoven engineering for heavy-duty vehicles.",
                },
              ]}
            />
          </motion.div>

          <motion.div
            className="md:w-2/3 flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full aspect-video">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-${activeTab}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <video
                    ref={videoRef}
                    src={activeSection === "passenger" 
                      ? (sections.passenger.videos as PassengerVideos)[activeTab]
                      : sections.commercial.videos.complete}
                    className="w-full h-full object-contain"
                    autoPlay={isPlaying}
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute pointer-events-none">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-white/30"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-blue-500/70"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-4 w-full flex justify-center gap-10 items-center"
            >
              {activeSection === "passenger" && 
                <TabNavigation 
                  activeTab={activeTab} 
                  setActiveTab={handleTabChange} 
                />
              }

              {/* Play/Pause button */}
              <PlayPauseButton
                isPlaying={isPlaying}
                onToggle={togglePlayPause}
                size="md"
                videoDuration={videoDuration}
                currentTime={currentTime}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Click anywhere text */}
        {showClickText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.7 : 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="text-white/70 text-sm absolute bottom-8 left-0 right-0 text-center"
          >
            Click anywhere for next slide
            <br />
            <span className="text-xs">(Only written for prototype)</span>
          </motion.p>
        )}
      </div>
    </main>
  )
}