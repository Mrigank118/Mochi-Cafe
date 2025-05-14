"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Coffee,
  CloudRain,
  Music,
  Users,
  Play,
  Pause,
  RotateCcw,
  X,
  Check,
  Plus,
  Wind,
  Waves,
  FlameIcon as Fire,
  Keyboard,
  Clock,
  Fan,
  Droplets,
  Tv,
  BookOpen,
  Timer,
  Volume2,
  Award,
  Power,
  SkipBack,
  SkipForward,
  Minimize,
  Maximize,
  BookMarked,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Add TV-specific styles
const tvStyles = `
  @keyframes noise {
    0%, 100% { background-position: 0 0; }
    10% { background-position: -5% -10%; }
    20% { background-position: -15% 5%; }
    30% { background-position: 7% -25%; }
    40% { background-position: 20% 25%; }
    50% { background-position: -25% 10%; }
    60% { background-position: 15% 5%; }
    70% { background-position: 0% 15%; }
    80% { background-position: 25% 35%; }
    90% { background-position: -10% 10%; }
  }

  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: noise 0.5s infinite;
  }

  .bg-scanlines {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 51%,
      rgba(255, 255, 255, 0.05) 100%
    );
    background-size: 100% 4px;
  }
`

// RetroTV Component
function RetroTV() {
  // Add the styles to the document
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = tvStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])
  // Sample YouTube video IDs - replace these with your own
  const videoIds = [
    "YwvP4b_Q2sw", // Oswald's Dino-Mite Stories (Full Video)
    "OYAxoT9Oby4", // Tom and Jerry SUPER LONG Compilation | Boomerang UK
    "ksswcJwry9I", // Classic Looney Tunes Cartoons: Best Full Episodes Collection!
    "zGpJQ0FxZmI", // Scooby-Doo! Jinx at the Sphinx - Full Episode
    "9o6wkcjCv-I", // DuckTales | S1 E15 | The Golden Lagoon of White Agony Plains!
    "K_Qpea1_EXw", // Dragon Tales | It's Cool to Be Me (Full DVD)
    "U41SZiDVGAM", // Thomas The Babysitter | Thomas & Friends UK
    "AoIaElLldhM", // FULL EPISODE: Haunted | Teen Titans | Cartoon Network
    "9rYSU8rm2Yg", // Shinchan Vs Butta | Full Series
    "5proeqlmHII", // Doraemon: Episode 15
  ]

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTvOn, setIsTvOn] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const tvRef = useRef<HTMLDivElement>(null)

  // Handle next video
  const nextVideo = () => {
    if (isTvOn) {
      setCurrentVideoIndex((prev) => (prev + 1) % videoIds.length)
    }
  }

  // Handle previous video
  const prevVideo = () => {
    if (isTvOn) {
      setCurrentVideoIndex((prev) => (prev === 0 ? videoIds.length - 1 : prev - 1))
    }
  }

  // Toggle TV on/off
  const toggleTv = () => {
    setIsTvOn((prev) => !prev)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!tvRef.current) return

    if (!document.fullscreenElement) {
      tvRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div ref={tvRef} className="relative">
      {/* TV Frame */}
      <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden border-8 border-[#5c3c28] shadow-xl">
        {/* TV Screen */}
        <div className={`aspect-video w-full relative ${!isTvOn ? "bg-black" : ""}`}>
          {/* Static Overlay when TV is off */}
          {!isTvOn && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-full h-full opacity-20 bg-noise"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          )}

          {/* YouTube Embed */}
          {isTvOn && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&mute=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {/* TV Reflection Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent"></div>

          {/* TV Scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>
        </div>

        {/* TV Controls */}
        <div className="bg-[#3e2f23] p-3 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={toggleTv}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isTvOn ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"} transition-colors`}
              aria-label={isTvOn ? "Turn TV off" : "Turn TV on"}
            >
              <Power size={16} className="text-white" />
            </button>

            <button
              onClick={prevVideo}
              disabled={!isTvOn}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isTvOn ? "bg-[#a6754f] hover:bg-[#8c5e3d]" : "bg-gray-700 cursor-not-allowed"} transition-colors`}
              aria-label="Previous video"
            >
              <SkipBack size={16} className="text-white" />
            </button>

            <button
              onClick={nextVideo}
              disabled={!isTvOn}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isTvOn ? "bg-[#a6754f] hover:bg-[#8c5e3d]" : "bg-gray-700 cursor-not-allowed"} transition-colors`}
              aria-label="Next video"
            >
              <SkipForward size={16} className="text-white" />
            </button>
          </div>

          <div className="text-[#f4ecd8] text-xs">
            {isTvOn ? `Channel ${currentVideoIndex + 1}/${videoIds.length}` : "TV Off"}
          </div>

          <button
            onClick={toggleFullscreen}
            disabled={!isTvOn}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${isTvOn ? "bg-[#a6754f] hover:bg-[#8c5e3d]" : "bg-gray-700 cursor-not-allowed"} transition-colors`}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize size={16} className="text-white" />
            ) : (
              <Maximize size={16} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* TV Stand */}
      <div className="h-4 w-1/3 mx-auto bg-[#5c3c28] rounded-b-lg"></div>
    </div>
  )
}

export default function CoffeeShopApp() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"tasks" | "timer" | "sounds" | "trophies">("tasks")

  // Introduction state
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  const introDialogues = [
    "hello there, young whippersnapper! *adjusts glasses* The name's Mochi, and this here is my little coffee shop.",
    "Been brewing the finest beans since before you were born, I reckon! *chuckles wheezily*",
    "This here contraption is for keeping track of your tasks. Back in my day, we just used our noggins! *taps head*",
    "And that timer? For studying, they say. In my time, we studied by candlelight until the rooster crowed!",
    "Anyway, make yourself at home. These fancy sound doohickeys can play all sorts of newfangled noises.",
    "The kids these days with their beep-boop machines... *sighs* Well, enjoy your coffee, youngster!",
  ]

  // TV-related dialogues
  const tvDialogues = [
    "Oh, you're turning on the television? In my day, we had to entertain ourselves with shadow puppets! *wiggles fingers*",
    "Changing the channel, eh? When I was your age, we had three channels, and two of them were static! *laughs*",
    "Turning off the TV? Good choice! Nothing beats a good book and the smell of fresh coffee! *nods approvingly*",
    "Full screen? My, my, aren't we fancy! Just don't sit too close or you'll hurt your eyes! *wags finger*",
    "These cartoons remind me of when I was knee-high to a grasshopper! *adjusts glasses nostalgically*",
  ]

  // Mochi's folk stories
  const mochiStories = [
    "Back in '52, I caught a fish THIS big! *stretches arms wide* The whole village ate for a week! 'Course, the story gets bigger every time I tell it! *winks*",
    "When I was just a kitten, I once chased a mouse through Mrs. Whiskers' garden. Knocked over her prize petunias! Had to help replant the whole garden! *laughs wheezily*",
    "Did I ever tell you about the Great Blizzard of '68? Snow piled higher than the roof! Had to tunnel my way to the coffee beans! Made the best hot chocolate that day! *nods proudly*",
    "My first coffee shop was no bigger than a broom closet! But we had CHARM! *gestures dramatically* Folks would line up around the block just for a sip of Mochi's special brew!",
    "Once met a traveling salesman who claimed his coffee beans were magical. Turned out they were just painted nuts! *slaps knee* Taught me to always check what I'm buying! *taps temple*",
    "During the summer of '75, it was so hot the roads melted! I served nothing but iced coffee for three months straight! My paws got so cold I had to wear mittens! *shivers comically*",
    "My grandmother taught me to read coffee grounds. Once told a customer they'd meet someone special. Next day, they bumped into their childhood sweetheart! *nods knowingly* The grounds never lie!",
    "Used to have a parrot in the old shop. That bird could mimic any customer's order! *imitates squawking* 'One espresso, extra hot!' Scared the whiskers off new customers! *chuckles*",
    "During the power outage of '82, I brewed coffee using an old camping stove. Place was lit with candles! Most romantic atmosphere we ever had! Three couples got engaged that night! *sighs happily*",
    "My secret ingredient? A pinch of cinnamon and a whole lotta love! *pats chest* That's how we did it in the old days, before all these fancy machines and whatnot!",
  ]

  // Current Mochi story
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  // Sound controls state
  const [sounds, setSounds] = useState({
    coffee: false,
    rain: false,
    bird: false,
    crowd: false,
    wind: false,
    waves: false,
    fire: false,
    keyboard: false,
    clock: false,
    fan: false,
    droplets: false,
    tv: false,
  })

  // Sound references
  const coffeeSoundRef = useRef<HTMLAudioElement | null>(null)
  const rainSoundRef = useRef<HTMLAudioElement | null>(null)
  const birdSoundRef = useRef<HTMLAudioElement | null>(null)
  const crowdSoundRef = useRef<HTMLAudioElement | null>(null)
  const windSoundRef = useRef<HTMLAudioElement | null>(null)
  const wavesSoundRef = useRef<HTMLAudioElement | null>(null)
  const fireSoundRef = useRef<HTMLAudioElement | null>(null)
  const keyboardSoundRef = useRef<HTMLAudioElement | null>(null)
  const clockSoundRef = useRef<HTMLAudioElement | null>(null)
  const fanSoundRef = useRef<HTMLAudioElement | null>(null)
  const dropletsSoundRef = useRef<HTMLAudioElement | null>(null)
  const tvSoundRef = useRef<HTMLAudioElement | null>(null)
  const mochiEnterSoundRef = useRef<HTMLAudioElement | null>(null)
  const textSoundRef = useRef<HTMLAudioElement | null>(null)

  // Sound availability state
  const [soundsLoaded, setSoundsLoaded] = useState({
    coffee: false,
    rain: false,
    bird: false,
    crowd: false,
    wind: false,
    waves: false,
    fire: false,
    keyboard: false,
    clock: false,
    fan: false,
    droplets: false,
    tv: false,
    mochiEnter: false,
    text: false,
  })

  // Tasks state
  const [tasks, setTasks] = useState<
    { id: string; text: string; items: { id: string; text: string; completed: boolean }[] }[]
  >([
    {
      id: "1",
      text: "Today's Tasks",
      items: [
        { id: "1-1", text: "Order more coffee beans", completed: false },
        { id: "1-2", text: "Clean espresso machine", completed: true },
        { id: "1-3", text: "Update menu board", completed: false },
        { id: "1-4", text: "Try new latte art", completed: false },
      ],
    },
  ])

  // New task input state
  const [newTaskText, setNewTaskText] = useState("")
  const [newItemText, setNewItemText] = useState("")
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  // Dialogue state
  const [dialogue, setDialogue] = useState("")
  const [displayedDialogue, setDisplayedDialogue] = useState("")
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showResponses, setShowResponses] = useState(false)
  const [showDialogue, setShowDialogue] = useState(false)
  const [mochiVisible, setMochiVisible] = useState(false)
  const mochiRef = useRef<HTMLDivElement>(null)

  // Timer state
  const [timerActive, setTimerActive] = useState(false)
  const [studyTime, setStudyTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Trophy system state
  const [trophies, setTrophies] = useState({
    espresso: {
      unlocked: false,
      name: "Espresso Shot",
      time: 5 * 60,
      description: "A quick shot of energy",
      image: "/images/coffee-espresso.png",
    },
    latte: {
      unlocked: false,
      name: "Creamy Latte",
      time: 15 * 60,
      description: "Smooth and comforting",
      image: "/images/coffee-latte.png",
    },
    cappuccino: {
      unlocked: false,
      name: "Frothy Cappuccino",
      time: 30 * 60,
      description: "Perfect balance of flavors",
      image: "/images/coffee-cappuccino.png",
    },
    mocha: {
      unlocked: false,
      name: "Rich Mocha",
      time: 45 * 60,
      description: "Chocolate-infused delight",
      image: "/images/coffee-mocha.png",
    },
    frappe: {
      unlocked: false,
      name: "Icy Frappe",
      time: 60 * 60,
      description: "Refreshingly cold",
      image: "/images/coffee-frappe.png",
    },
    affogato: {
      unlocked: false,
      name: "Sweet Affogato",
      time: 90 * 60,
      description: "Coffee meets dessert",
      image: "/images/coffee-affogato.png",
    },
  })

  // Get a new random story
  const getNewStory = () => {
    let newIndex = Math.floor(Math.random() * mochiStories.length)
    // Make sure we don't get the same story twice in a row
    while (newIndex === currentStoryIndex) {
      newIndex = Math.floor(Math.random() * mochiStories.length)
    }
    setCurrentStoryIndex(newIndex)
    showNewDialogue(mochiStories[newIndex])
  }

  // Safe play function that won't crash if audio isn't available
  const safePlayAudio = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      // Create a promise that resolves when the audio plays or rejects on error
      const playPromise = audioRef.current.play()

      // If the promise exists (modern browsers), handle potential errors
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silently handle the error - audio will just not play
          console.log("Audio not available yet:", error)
        })
      }
    }
  }

  // Safe pause function
  const safePauseAudio = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      try {
        audioRef.current.pause()
      } catch (error) {
        console.log("Could not pause audio:", error)
      }
    }
  }

  // Handle intro progression
  useEffect(() => {
    if (showIntro) {
      showNewDialogue(introDialogues[introStep])
    }
  }, [introStep, showIntro])

  // Dialogue typing effect
  useEffect(() => {
    if (dialogueIndex < dialogue.length) {
      const timer = setTimeout(() => {
        setDisplayedDialogue((prev) => prev + dialogue[dialogueIndex])
        setDialogueIndex((prev) => prev + 1)

        // Play text sound occasionally (every 4 characters)
        if (dialogueIndex % 4 === 0) {
          // Only try to play if we have a text sound
          if (textSoundRef.current) {
            try {
              // Clone the audio node to allow overlapping sounds
              const soundClone = textSoundRef.current.cloneNode() as HTMLAudioElement
              soundClone.volume = 0.1 // Lower volume for text sounds

              // Play but don't crash if it fails
              const playPromise = soundClone.play()
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Silently fail - text will still appear without sound
                })
              }
            } catch (err) {
              // Silently fail - text will still appear without sound
            }
          }
        }
      }, 50)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowResponses(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [dialogue, dialogueIndex])

  // Timer effect
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setStudyTime((prev) => {
          const newTime = prev + 1

          // Check for trophy unlocks
          Object.entries(trophies).forEach(([key, trophy]) => {
            if (!trophy.unlocked && newTime >= trophy.time) {
              setTrophies((prev) => ({
                ...prev,
                [key]: { ...trophy, unlocked: true },
              }))

              // Show trophy unlock message
              showNewDialogue(
                `Congratulations! You've unlocked the ${trophy.name}! *claps enthusiastically* Keep up the good work!`,
              )
            }
          })

          return newTime
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerActive, trophies])

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  // Reset dialogue for new messages
  const showNewDialogue = (message: string) => {
    setDialogue(message)
    setDisplayedDialogue("")
    setDialogueIndex(0)
    setShowResponses(false)
    setShowDialogue(true)
    setMochiVisible(true)

    // Play Mochi enter sound if not already visible
    if (!mochiVisible) {
      safePlayAudio(mochiEnterSoundRef)
    }

    // Animate Mochi rising from bottom
    if (mochiRef.current) {
      mochiRef.current.style.transform = "translateY(0)"
    }
  }

  // Hide dialogue and Mochi
  const hideDialogue = () => {
    setShowDialogue(false)

    // Animate Mochi going back down
    if (mochiRef.current) {
      mochiRef.current.style.transform = "translateY(100%)"

      // Wait for animation to complete before hiding Mochi
      setTimeout(() => {
        setMochiVisible(false)
      }, 500)
    }
  }

  // Handle sound toggle
  const toggleSound = (sound: keyof typeof sounds) => {
    setSounds((prev) => ({ ...prev, [sound]: !prev[sound] }))

    // Play or pause the sound
    const soundRefs: Record<string, React.RefObject<HTMLAudioElement>> = {
      coffee: coffeeSoundRef,
      rain: rainSoundRef,
      bird: birdSoundRef,
      crowd: crowdSoundRef,
      wind: windSoundRef,
      waves: wavesSoundRef,
      fire: fireSoundRef,
      keyboard: keyboardSoundRef,
      clock: clockSoundRef,
      fan: fanSoundRef,
      droplets: dropletsSoundRef,
      tv: tvSoundRef,
    }

    const soundRef = soundRefs[sound]
    if (!sounds[sound]) {
      safePlayAudio(soundRef)
    } else {
      safePauseAudio(soundRef)
    }

    // Show dialogue based on sound toggle
    const messages: Record<string, string> = {
      coffee: "Ah, the sound of coffee brewing... reminds me of the good ol' days! *inhales deeply*",
      rain: "Rain, eh? My joints can predict rain better than any weatherman! *rubs knee*",
      bird: "Birds? In my day, we called it 'devil's music'! *winks* Just kidding, youngster!",
      crowd: "The murmur of customers... music to these old ears! Business is brewing! *chuckles*",
      wind: "A gentle breeze through the windows... keeps the place fresh! *takes a deep breath*",
      waves: "Ocean waves? Reminds me of my vacation to the coast back in '72! *nostalgic sigh*",
      fire: "Nothing like a crackling fire to set the mood! Careful not to burn the beans! *winks*",
      keyboard: "Tap-tap-tapping away! Like a modern typewriter, isn't it? *adjusts glasses*",
      clock: "Tick-tock! Time waits for no one, especially not old Mochi! *taps wristwatch*",
      fan: "Need to keep cool while you work? Smart thinking! *fans self dramatically*",
      droplets: "Water droplets... soothing as a gentle drip coffee, don't you think? *smiles*",
      tv: "Background chatter? Sometimes I leave my TV on just for company! *chuckles*",
    }

    showNewDialogue(
      sounds[sound]
        ? `I'll turn off the ${sound} sounds, my hearing ain't what it used to be anyway!`
        : messages[sound],
    )
  }

  // Add new task
  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newTaskText,
          items: [],
        },
      ])
      setNewTaskText("")
      showNewDialogue("New task added! Back in my day, we just tied string around our fingers! *adjusts glasses*")
    }
  }

  // Add new item to task
  const addItemToTask = (taskId: string) => {
    if (newItemText.trim()) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                items: [
                  ...task.items,
                  {
                    id: `${taskId}-${Date.now()}`,
                    text: newItemText,
                    completed: false,
                  },
                ],
              }
            : task,
        ),
      )
      setNewItemText("")
      setActiveTaskId(null)
      showNewDialogue("Breaking things down into smaller tasks, eh? Smart! Like chopping firewood for the winter!")
    }
  }

  // Toggle item completion
  const toggleItemCompletion = (taskId: string, itemId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              items: task.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
            }
          : task,
      ),
    )

    showNewDialogue("Checking things off, are we? Satisfying as stamping the perfect latte art, isn't it? *proud nod*")
  }

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    showNewDialogue("Task removed! Sometimes simplifying is good! Like my coffee - black, no fancy syrups!")
  }

  // Delete item
  const deleteItem = (taskId: string, itemId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              items: task.items.filter((item) => item.id !== itemId),
            }
          : task,
      ),
    )
  }

  // Handle dialogue responses
  const handleResponse = (response: string) => {
    switch (response) {
      case "Thanks":
        showNewDialogue("You're welcome, youngster! Always happy to share my wisdom! *puffs chest proudly*")
        break
      case "Shhh":
        showNewDialogue(
          "Oh! *lowers voice* Sorry about that! These old vocal cords don't know their own volume! *whispers dramatically*",
        )
        break
      case "Skip":
        setShowIntro(false)
        hideDialogue()
        break
      case "Next":
        if (introStep < introDialogues.length - 1) {
          setIntroStep((prev) => prev + 1)
        } else {
          setShowIntro(false)
          hideDialogue()
        }
        break
      case "Ok":
        hideDialogue()
        break
      case "Another Story":
        getNewStory()
        break
    }
  }

  // TV control handlers with Mochi dialogues
  const handleTvPower = (isOn: boolean) => {
    showNewDialogue(isOn ? tvDialogues[0] : tvDialogues[2])
  }

  const handleChannelChange = () => {
    showNewDialogue(tvDialogues[1])
  }

  const handleFullscreen = (isFullscreen: boolean) => {
    showNewDialogue(tvDialogues[3])
  }

  // Timer controls
  const startTimer = () => {
    setTimerActive(true)
    showNewDialogue("Starting the timer, eh? Focus like a cat on a mouse! *squints eyes intensely*")
  }

  const pauseTimer = () => {
    setTimerActive(false)
    showNewDialogue("Taking a break? Good! Even old Mochi needs catnaps between coffee batches!")
  }

  const resetTimer = () => {
    setTimerActive(false)
    setStudyTime(0)
    showNewDialogue("Starting fresh! As I always say, 'Yesterday's grounds don't make today's coffee!'")
  }

  // Trigger intro on page load
  useEffect(() => {
    if (showIntro) {
      // Small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        showNewDialogue(introDialogues[introStep])
      }, 500)
      return () => clearTimeout(timer)
    }
  }, []) // Empty dependency array means this runs once on mount

  // Check if audio files are loaded
  useEffect(() => {
    // Function to check if an audio element can play
    const checkAudioLoaded = (audioRef: React.RefObject<HTMLAudioElement>, key: keyof typeof soundsLoaded) => {
      if (audioRef.current) {
        const handleCanPlay = () => {
          setSoundsLoaded((prev) => ({ ...prev, [key]: true }))
        }

        audioRef.current.addEventListener("canplaythrough", handleCanPlay)

        // Clean up
        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener("canplaythrough", handleCanPlay)
          }
        }
      }
    }

    // Set up listeners for all audio elements
    const cleanupFunctions = [
      checkAudioLoaded(coffeeSoundRef, "coffee"),
      checkAudioLoaded(rainSoundRef, "rain"),
      checkAudioLoaded(birdSoundRef, "bird"),
      checkAudioLoaded(crowdSoundRef, "crowd"),
      checkAudioLoaded(windSoundRef, "wind"),
      checkAudioLoaded(wavesSoundRef, "waves"),
      checkAudioLoaded(fireSoundRef, "fire"),
      checkAudioLoaded(keyboardSoundRef, "keyboard"),
      checkAudioLoaded(clockSoundRef, "clock"),
      checkAudioLoaded(fanSoundRef, "fan"),
      checkAudioLoaded(dropletsSoundRef, "droplets"),
      checkAudioLoaded(tvSoundRef, "tv"),
      checkAudioLoaded(mochiEnterSoundRef, "mochiEnter"),
      checkAudioLoaded(textSoundRef, "text"),
    ]

    // Clean up all listeners
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup && cleanup())
    }
  }, [])

  // Calculate progress to next trophy
  const getNextTrophy = () => {
    const unlockedTrophies = Object.values(trophies).filter((trophy) => trophy.unlocked)
    const nextTrophies = Object.values(trophies).filter((trophy) => !trophy.unlocked)

    if (nextTrophies.length === 0) return null

    // Sort by time required
    nextTrophies.sort((a, b) => a.time - b.time)
    const nextTrophy = nextTrophies[0]

    const progress = Math.min(100, (studyTime / nextTrophy.time) * 100)

    return {
      trophy: nextTrophy,
      progress,
      timeLeft: nextTrophy.time - studyTime,
    }
  }

  const nextTrophyInfo = getNextTrophy()

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden font-sans text-white bg-[#2a1f18]">
      {/* Cafe Background with Wooden Texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#3e2f23] opacity-50 bg-[url('/images/wood-texture.jpg')] bg-repeat"></div>

        {/* Cafe Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Hanging Lights */}
          <div className="absolute top-0 left-1/4 w-4 h-20 bg-[#f4ecd8] opacity-20 rounded-full blur-md"></div>
          <div className="absolute top-0 right-1/4 w-4 h-20 bg-[#f4ecd8] opacity-20 rounded-full blur-md"></div>

          {/* Wall Art */}
          <div className="hidden md:block absolute top-10 left-10 w-32 h-24 bg-[#a6754f] opacity-30 rounded-md"></div>
          <div className="hidden md:block absolute top-10 right-10 w-32 h-24 bg-[#a6754f] opacity-30 rounded-md"></div>

          {/* Plants */}
          <div className="hidden lg:block absolute bottom-20 left-5 w-16 h-24 bg-green-800 opacity-20 rounded-md"></div>
          <div className="hidden lg:block absolute bottom-20 right-5 w-16 h-24 bg-green-800 opacity-20 rounded-md"></div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#3e2f23] border-t-2 border-[#deb887] z-30 flex justify-around items-center p-2">
        <button
          onClick={() => setActiveTab("tasks")}
          className={cn(
            "p-2 rounded-md flex flex-col items-center",
            activeTab === "tasks" ? "bg-[#a6754f] text-white" : "text-[#f4ecd8]",
          )}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Tasks</span>
        </button>

        <button
          onClick={() => setActiveTab("timer")}
          className={cn(
            "p-2 rounded-md flex flex-col items-center",
            activeTab === "timer" ? "bg-[#a6754f] text-white" : "text-[#f4ecd8]",
          )}
        >
          <Timer size={20} />
          <span className="text-xs mt-1">Timer</span>
        </button>

        <button
          onClick={() => setActiveTab("sounds")}
          className={cn(
            "p-2 rounded-md flex flex-col items-center",
            activeTab === "sounds" ? "bg-[#a6754f] text-white" : "text-[#f4ecd8]",
          )}
        >
          <Volume2 size={20} />
          <span className="text-xs mt-1">Sounds</span>
        </button>

        <button
          onClick={() => setActiveTab("trophies")}
          className={cn(
            "p-2 rounded-md flex flex-col items-center",
            activeTab === "trophies" ? "bg-[#a6754f] text-white" : "text-[#f4ecd8]",
          )}
        >
          <Award size={20} />
          <span className="text-xs mt-1">Coffee</span>
        </button>
      </div>

      {/* Coffee Shop Name Sign */}
      <div className="relative z-10 w-full bg-[#3e2f23] border-b-2 border-[#deb887] p-3 text-center">
        <h1 className="text-2xl font-bold text-[#f4ecd8]">MOCHI'S STUDY CAFÉ</h1>
        <p className="text-sm text-[#deb887]">Est. 1952 • Where Focus Brews Success</p>
      </div>

      {/* Main Content Area - Responsive Grid */}
      <div className="relative z-10 container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Task Board (Left Side on Desktop, Tab on Mobile) */}
        <div
          className={cn(
            "md:col-span-4 bg-[#3e2f23] bg-opacity-90 p-4 rounded-lg border-2 border-[#deb887] md:block h-full",
            activeTab !== "tasks" && "hidden md:block",
          )}
        >
          {/* Television */}
          <div className="text-lg mb-4 text-[#f4ecd8] font-semibold flex items-center">
            <Tv className="mr-2" size={18} />
            VINTAGE TV
          </div>
          <RetroTV />

          <div className="text-lg mt-6 mb-4 text-[#f4ecd8] font-semibold flex items-center">
            <BookOpen className="mr-2" size={18} />
            TASKS
          </div>

          {/* Add new task */}
          <div className="mb-6 bg-[#f4ecd8] p-3 rounded-md shadow-md">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="New sticky note..."
              className="w-full bg-transparent text-[#3e2f23] placeholder-[#a6754f]/70 outline-none border-b-2 border-[#a6754f] mb-2 px-1 py-1 font-sans text-sm"
            />
            <button
              onClick={addTask}
              className="bg-[#a6754f] text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 hover:bg-[#8c5e3d] transition-colors"
            >
              <Plus size={12} /> Add Note
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-500px)] md:max-h-[calc(100vh-400px)]">
            {tasks.map((task) => (
              <div key={task.id} className="bg-[#f4ecd8] p-3 rounded-md shadow-md relative">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="absolute top-1 right-1 text-[#3e2f23] hover:text-red-600 transition-colors"
                  aria-label="Delete task"
                ></button>

                <h3 className="text-[#3e2f23] font-bold mb-2 pr-4">{task.text}</h3>

                <ul className="space-y-2 mb-3">
                  {task.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-2 text-xs text-[#3e2f23]">
                      <button
                        onClick={() => toggleItemCompletion(task.id, item.id)}
                        className={cn(
                          "mt-0.5 w-4 h-4 border-2 flex items-center justify-center",
                          item.completed ? "bg-[#a6754f] border-[#a6754f]" : "border-[#a6754f]",
                        )}
                        aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {item.completed && <Check size={10} className="text-white" />}
                      </button>
                      <span className={cn(item.completed && "line-through text-[#3e2f23]/60")}>{item.text}</span>
                      <button
                        onClick={() => deleteItem(task.id, item.id)}
                        className="ml-auto text-[#3e2f23] hover:text-red-600 transition-colors"
                        aria-label="Delete item"
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>

                {activeTaskId === task.id ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      placeholder="New item..."
                      className="w-full bg-transparent text-[#3e2f23] placeholder-[#a6754f]/70 outline-none border-b-2 border-[#a6754f] mb-2 px-1 py-1 text-xs"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addItemToTask(task.id)
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => addItemToTask(task.id)}
                        className="bg-[#a6754f] text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 hover:bg-[#8c5e3d] transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setActiveTaskId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTaskId(task.id)}
                    className="text-xs text-[#3e2f23] hover:text-[#a6754f] transition-colors flex items-center gap-1"
                  >
                    <Plus size={10} /> Add item
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Timer and YouTube (Center on Desktop, Tab on Mobile) */}
        <div className={cn("md:col-span-4 space-y-6 md:block h-full", activeTab !== "timer" && "hidden md:block")}>
          {/* Timer Display */}
          <div className="bg-[#3e2f23] bg-opacity-90 p-4 rounded-lg border-2 border-[#deb887]">
            <div className="text-lg mb-4 text-[#f4ecd8] font-semibold flex items-center">
              <Timer className="mr-2" size={18} />
              STUDY TIMER
            </div>
            <div className="text-center text-3xl font-mono text-[#f4ecd8] mb-4">{formatTime(studyTime)}</div>
            <div className="flex justify-between">
              <button
                onClick={startTimer}
                className="bg-[#a6754f] text-white px-3 py-2 rounded hover:bg-[#8c5e3d] text-sm flex items-center"
              >
                <Play size={14} className="mr-1" /> Start
              </button>
              <button
                onClick={pauseTimer}
                className="bg-[#a6754f] text-white px-3 py-2 rounded hover:bg-[#8c5e3d] text-sm flex items-center"
              >
                <Pause size={14} className="mr-1" /> Pause
              </button>
              <button
                onClick={resetTimer}
                className="bg-[#a6754f] text-white px-3 py-2 rounded hover:bg-[#8c5e3d] text-sm flex items-center"
              >
                <RotateCcw size={14} className="mr-1" /> Reset
              </button>
            </div>

            {/* Next Trophy Progress */}
            {nextTrophyInfo && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#f4ecd8] mb-1">
                  <span>Next: {nextTrophyInfo.trophy.name}</span>
                  <span>{Math.floor(nextTrophyInfo.timeLeft / 60)} min left</span>
                </div>
                <div className="w-full bg-[#2a1f18] rounded-full h-2">
                  <div className="bg-[#deb887] h-2 rounded-full" style={{ width: `${nextTrophyInfo.progress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Coffee Shelf / Trophy System */}
          <div
            className={cn(
              "bg-[#3e2f23] bg-opacity-90 p-4 rounded-lg border-2 border-[#deb887] md:block",
              activeTab !== "trophies" && "hidden md:block",
            )}
          >
            <div className="text-lg mb-4 text-[#f4ecd8] font-semibold flex items-center">
              <Award className="mr-2" size={18} />
              COFFEE COLLECTION
            </div>

            {/* Wooden Shelf Background */}
            <div className="relative bg-[#2a1f18] rounded-lg p-3 border border-[#a6754f]">
              {/* Shelf Dividers */}
              <div className="absolute left-0 right-0 top-1/3 h-2 bg-[#3e2f23]"></div>
              <div className="absolute left-0 right-0 top-2/3 h-2 bg-[#3e2f23]"></div>

              {/* Coffee Items on Shelves */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {Object.entries(trophies).map(([key, trophy], index) => (
                  <div
                    key={key}
                    className={cn(
                      "p-3 flex flex-col items-center transition-all duration-300",
                      trophy.unlocked ? "opacity-100" : "opacity-40",
                    )}
                  >
                    <div className="relative w-16 h-20 mb-2">
                      {trophy.unlocked ? (
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Coffee size={40} className="text-[#a6754f]" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#a6754f] rounded-b-lg"></div>
                          <div className="absolute bottom-6 left-0 right-0 h-10 bg-gradient-to-b from-[#deb887] to-[#a6754f] rounded-t-lg"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-[#deb887]/30 rounded-lg">
                          <Coffee size={30} className="text-[#deb887]/30" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm text-[#f4ecd8]">{trophy.unlocked ? trophy.name : "???"}</div>
                      <div className="text-xs text-[#deb887]">
                        {trophy.unlocked ? trophy.description : `${Math.floor(trophy.time / 60)} min study`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sound Controls and Mochi Stories */}
        <div className="md:col-span-4 space-y-6 h-full">
          {/* Sound Controls */}
          <div
            className={cn(
              "bg-[#3e2f23] bg-opacity-90 p-4 rounded-lg border-2 border-[#deb887] md:block",
              activeTab !== "sounds" && "hidden md:block",
            )}
          >
            <div className="text-lg mb-4 text-[#f4ecd8] font-semibold flex items-center">
              <Volume2 className="mr-2" size={18} />
              AMBIENT SOUNDS
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              <button
                onClick={() => toggleSound("coffee")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.coffee ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle coffee machine sound"
              >
                <Coffee size={20} />
                <span className="text-xs mt-1">Coffee</span>
              </button>

              <button
                onClick={() => toggleSound("rain")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.rain ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle rain sound"
              >
                <CloudRain size={20} />
                <span className="text-xs mt-1">Rain</span>
              </button>

              <button
                onClick={() => toggleSound("bird")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.bird ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle bird music"
              >
                <Music size={20} />
                <span className="text-xs mt-1">Birds</span>
              </button>

              <button
                onClick={() => toggleSound("crowd")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.crowd ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle crowd murmur"
              >
                <Users size={20} />
                <span className="text-xs mt-1">Crowd</span>
              </button>

              <button
                onClick={() => toggleSound("wind")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.wind ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle wind sound"
              >
                <Wind size={20} />
                <span className="text-xs mt-1">Wind</span>
              </button>

              <button
                onClick={() => toggleSound("waves")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.waves ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle waves sound"
              >
                <Waves size={20} />
                <span className="text-xs mt-1">Waves</span>
              </button>

              <button
                onClick={() => toggleSound("fire")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.fire ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle fire sound"
              >
                <Fire size={20} />
                <span className="text-xs mt-1">Fire</span>
              </button>

              <button
                onClick={() => toggleSound("keyboard")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.keyboard ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle keyboard sound"
              >
                <Keyboard size={20} />
                <span className="text-xs mt-1">Keys</span>
              </button>

              <button
                onClick={() => toggleSound("clock")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.clock ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle clock sound"
              >
                <Clock size={20} />
                <span className="text-xs mt-1">Clock</span>
              </button>

              <button
                onClick={() => toggleSound("fan")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.fan ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle fan sound"
              >
                <Fan size={20} />
                <span className="text-xs mt-1">Fan</span>
              </button>

              <button
                onClick={() => toggleSound("droplets")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.droplets ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle water droplets sound"
              >
                <Droplets size={20} />
                <span className="text-xs mt-1">Drops</span>
              </button>

              <button
                onClick={() => toggleSound("tv")}
                className={cn(
                  "p-2 rounded-md transition-all duration-300 flex flex-col items-center",
                  sounds.tv ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
                )}
                aria-label="Toggle TV sound"
              >
                <Tv size={20} />
                <span className="text-xs mt-1">TV</span>
              </button>
            </div>
          </div>

          {/* Mochi Stories Section */}
          <div className="bg-[#3e2f23] bg-opacity-90 p-4 rounded-lg border-2 border-[#deb887]">
            <div className="text-lg mb-4 text-[#f4ecd8] font-semibold flex items-center">
              <BookMarked className="mr-2" size={18} />
              MOCHI STORIES
            </div>

            <div className="bg-[#f4ecd8] p-4 rounded-md text-[#3e2f23] relative">
              <div className="absolute -top-2 -left-2 bg-[#a6754f] rounded-full p-2">
                <Sparkles size={16} className="text-white" />
              </div>

              <p className="text-sm mb-2 pt-2">{mochiStories[currentStoryIndex]}</p>
              <div className="flex justify-end">
                <button
                  onClick={getNewStory}
                  className="bg-[#a6754f] text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 hover:bg-[#8c5e3d] transition-colors mt-2"
                >
                  Another Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mochi Character - Always Visible but smaller on mobile */}
      {mochiVisible && (
        <div
          ref={mochiRef}
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 transition-transform duration-500 pb-16 md:pb-0"
          style={{ transform: "translateY(100%)" }}
        >
          {/* Dialogue Box and Mochi Side-by-Side */}
          <div className="flex items-end justify-center mb-2 relative">
            {/* Dialogue Box */}
            {showDialogue && (
              <div className="relative flex items-end">
                <div className="mb-4 w-[80vw] max-w-md bg-[#3e2f23] border-4 border-[#deb887] p-4 rounded-lg z-10">
                  <p className="text-[#f4ecd8] text-sm leading-relaxed font-sans">
                    {displayedDialogue}
                    {dialogueIndex >= dialogue.length && <span className="inline-block animate-pulse ml-1">▶</span>}
                  </p>

                  {/* Response Options */}
                  {showResponses && (
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {showIntro ? (
                        <>
                          <button
                            onClick={() => handleResponse("Skip")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Skip Intro
                          </button>
                          <button
                            onClick={() => handleResponse("Next")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Next
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleResponse("Thanks")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Thanks
                          </button>
                          <button
                            onClick={() => handleResponse("Shhh")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Shhh
                          </button>
                          <button
                            onClick={() => handleResponse("Ok")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Ok
                          </button>
                          <button
                            onClick={() => handleResponse("Another Story")}
                            className="bg-[#3e2f23] border-2 border-[#deb887] px-4 py-1 rounded-md text-sm hover:bg-[#a6754f] transition-colors"
                          >
                            Another Story
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mochi Character - Smaller on mobile */}
                <div className="ml-[-40px] md:ml-[-60px] -mb-3 w-40 md:w-56 h-40 md:h-60 relative z-20">
                  <Image
                    src="/images/mochi.png"
                    alt="Mochi the café owner"
                    width={160}
                    height={160}
                    className="object-contain scale-x-[-1] w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio Elements */}
      <>
        <audio ref={rainSoundRef} src="./sounds/rain.mp3" loop preload="none" />
        <audio ref={coffeeSoundRef} src="./sounds/coffee.mp3" loop preload="none" />
        <audio ref={birdSoundRef} src="./sounds/birds.mp3" loop preload="none" />
        <audio ref={windSoundRef} src="./sounds/wind.mp3" loop preload="none" />
        <audio ref={wavesSoundRef} src="./sounds/waves.mp3" loop preload="none" />
        <audio ref={fireSoundRef} src="./sounds/fire.mp3" loop preload="none" />
        <audio ref={keyboardSoundRef} src="./sounds/keyboard.mp3" loop preload="none" />
        <audio ref={clockSoundRef} src="./sounds/clock.mp3" loop preload="none" />
        <audio ref={fanSoundRef} src="./sounds/fan.mp3" loop preload="none" />
        <audio ref={dropletsSoundRef} src="./sounds/droplets.mp3" loop preload="none" />
        <audio ref={tvSoundRef} src="./sounds/tv.mp3" loop preload="none" />
        {/* 
        <audio ref={textSoundRef} src="./sounds/text-sound.mp3" preload="none" />
        <audio ref={crowdSoundRef} src="./sounds/crowd.mp3" loop preload="none" />
        <audio ref={mochiEnterSoundRef} src="./sounds/mochi-enter.mp3" preload="none" />
        */}
      </>
    </main>
  )
}
