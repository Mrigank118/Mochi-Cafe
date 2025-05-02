"use client"

import { useState, useEffect, useRef } from "react"
import { Coffee, CloudRain, Music, Users, Play, Pause, RotateCcw, X, Check, Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function CoffeeShopApp() {
  // Introduction state
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  const introDialogues = [
    "Well, hello there, young whippersnapper! *adjusts glasses* The name's Mochi, and this here is my little coffee shop.",
    "Been brewing the finest beans since before you were born, I reckon! *chuckles wheezily*",
    "This here contraption is for keeping track of your tasks. Back in my day, we just used our noggins! *taps head*",
    "And that timer? For studying, they say. In my time, we studied by candlelight until the rooster crowed!",
    "Anyway, make yourself at home. These fancy sound doohickeys can play all sorts of newfangled noises.",
    "The kids these days with their beep-boop machines... *sighs* Well, enjoy your coffee, youngster!",
  ]

  // Sound controls state
  const [sounds, setSounds] = useState({
    coffee: false,
    rain: false,
    jazz: false,
    crowd: false,
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
        setStudyTime((prev) => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerActive])

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

    // Show dialogue based on sound toggle
    const messages = {

      coffee: "Ah, the sound of coffee brewing... reminds me of the good ol' days! *inhales deeply*",
      rain: "Rain, eh? My joints can predict rain better than any weatherman! *rubs knee*",
      jazz: "Jazz music? In my day, we called it 'devil's music'! *winks* Just kidding, youngster!",
      crowd: "The murmur of customers... music to these old ears! Business is brewing! *chuckles*",
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
    }
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

  return (
    <main className="relative h-screen w-screen overflow-hidden font-pixel text-white">
      {/* Background with lighter overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/cafe-background-3.gif" alt="Cozy café background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Task Board (Left Side) */}
      <div className="absolute top-8 left-4 bottom-8 z-10 w-75 bg-[#3e2f23] bg-opacity-80 p-4 rounded-lg border-2 border-[#deb887] overflow-y-auto">
        <div className="text-lg mb-4 text-[#f4ecd8]">TASKS</div>

        {/* Add new task */}
        <div className="mb-6 bg-[#f4ecd8] p-3 rounded-md shadow-md">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="New sticky note..."
            className="w-full bg-transparent text-[#3e2f23] placeholder-[#a6754f]/70 outline-none border-b-2 border-[#a6754f] mb-2 px-1 py-1 font-pixel text-sm"
          />
          <button
            onClick={addTask}
            className="bg-[#a6754f] text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 hover:bg-[#8c5e3d] transition-colors"
          >
            <Plus size={12} /> Add Note
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#f4ecd8] p-3 rounded-md shadow-md relative">
              <button
                onClick={() => deleteTask(task.id)}
                className="absolute top-1 right-1 text-[#3e2f23] hover:text-red-600 transition-colors"
                aria-label="Delete task"
              >
                
              </button>

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

        {/* Timer Display */}
        <div className="bg-[#f4ecd8] p-3 rounded-md shadow-md mt-6">
          <div className="text-[#3e2f23] font-bold mb-2">STUDY TIMER</div>
          <div className="text-center text-xl font-mono text-[#3e2f23] mb-3">{formatTime(studyTime)}</div>
          <div className="flex justify-between">
            <button
              onClick={startTimer}
              className="bg-[#a6754f] text-white px-2 py-1 rounded hover:bg-[#8c5e3d] text-xs"
            >
              <Play size={12} className="inline mr-1" /> Start
            </button>
            <button
              onClick={pauseTimer}
              className="bg-[#a6754f] text-white px-2 py-1 rounded hover:bg-[#8c5e3d] text-xs"
            >
              <Pause size={12} className="inline mr-1" /> Pause
            </button>
            <button
              onClick={resetTimer}
              className="bg-[#a6754f] text-white px-2 py-1 rounded hover:bg-[#8c5e3d] text-xs"
            >
              <RotateCcw size={12} className="inline mr-1" /> Reset
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div className="bg-[#f4ecd8] p-3 rounded-md shadow-md mt-6">
          <div className="text-[#3e2f23] font-bold mb-2">Coming Soon</div>
          <br>
          </br>
          
        </div>

        


      </div>



      {/* Sound Controls (Right Side) */}
      <div className="absolute top-4 right-4 z-10 bg-[#3e2f23] bg-opacity-80 p-3 rounded-lg border-2 border-[#deb887]">
        <div className="text-xs mb-2 text-[#f4ecd8]">AMBIENT SOUNDS</div>
        <div className="flex gap-3">
          <button
            onClick={() => toggleSound("coffee")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              sounds.coffee ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
            )}
            aria-label="Toggle coffee machine sound"
          >
            <Coffee size={20} />
          </button>
          
          <button
            onClick={() => toggleSound("rain")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              sounds.rain ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
            )}
            aria-label="Toggle rain sound"
          >
            <CloudRain size={20} />
          </button>
          <button
            onClick={() => toggleSound("jazz")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              sounds.jazz ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
            )}
            aria-label="Toggle jazz music"
          >
            <Music size={20} />
          </button>
          <button
            onClick={() => toggleSound("crowd")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              sounds.crowd ? "bg-[#a6754f] text-white" : "bg-[#f4ecd8] text-[#3e2f23]",
            )}
            aria-label="Toggle crowd murmur"
          >
            <Users size={20} />
          </button>
        </div>
      </div>

      {mochiVisible && (
        <div
          ref={mochiRef}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 transition-transform duration-500"
          style={{ transform: "translateY(100%)" }}
        >
          {/* Dialogue Box and Mochi Side-by-Side */}
          <div className="flex items-end justify-center mb-2 relative">
            {/* Dialogue Box */}
            {showDialogue && (
              <div className="relative flex items-end">
                <div className="mb-4 w-[91vw] max-w-2xl bg-[#3e2f23] border-4 border-[#deb887] p-4 rounded-lg z-10">
                  <p className="text-[#f4ecd8] text-sm leading-relaxed">
                    {displayedDialogue}
                    {dialogueIndex >= dialogue.length && (
                      <span className="inline-block animate-pulse ml-1">▶</span>
                    )}
                  </p>

                  {/* Response Options */}
                  {showResponses && (
                    <div className="flex justify-center gap-4 mt-3">
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
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mochi Character to the Right */}
                <div className="ml-[-60px] -mb-3 w-56 h-60 relative z-20">
                  <Image
                    src="/images/mochi.png"
                    alt="Mochi the café owner"
                    width={224}
                    height={224}
                    className="object-contain scale-x-[-1]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}


    </main>
  )
}
