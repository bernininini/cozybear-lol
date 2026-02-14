import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Simple AI-like responses for general help
    const getResponse = (message: string): string => {
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
        return "Hey there! 🐨 I'm bean, your helpful assistant. I'm here to help with anything you need - studying, coding, questions, or just having a chat. What's on your mind today?"
      }

      if (lowerMessage.includes("coding") || lowerMessage.includes("programming") || lowerMessage.includes("code")) {
        return "💻 I'd love to help with coding! I can assist with:\n\n• **Python, C, C++** - syntax, concepts, debugging\n• **Problem solving** - breaking down complex problems\n• **Best practices** - clean code and good habits\n• **Learning paths** - what to study next\n• **Project ideas** - fun things to build\n\nWhat specific coding topic would you like help with?"
      }

      if (lowerMessage.includes("study") || lowerMessage.includes("learn")) {
        return "📚 Great! I'm here to help you learn effectively. I can help with:\n\n• **Study strategies** - techniques that actually work\n• **Explaining concepts** - breaking down complex topics\n• **Creating study plans** - organized learning paths\n• **Memory techniques** - ways to remember better\n• **Motivation tips** - staying focused and engaged\n\nWhat subject or topic would you like to dive into?"
      }

      if (lowerMessage.includes("quantum physics") || lowerMessage.includes("quantum")) {
        return "🔬 Quantum physics is fascinating! Think of it as the weird rules that govern tiny particles:\n\n• **Superposition**: Particles can be in multiple states at once (like Schrödinger's cat)\n• **Entanglement**: Particles can be mysteriously connected across distances\n• **Uncertainty**: We can't know everything about a particle simultaneously\n• **Wave-particle duality**: Things can act like both waves and particles\n\nIt's counterintuitive because our everyday world doesn't work this way, but it's fundamental to how the universe operates at the smallest scales! Want me to explain any specific aspect?"
      }

      if (lowerMessage.includes("math") || lowerMessage.includes("mathematics")) {
        return "🔢 Math is everywhere! I can help with:\n\n• **Algebra & Calculus** - equations, derivatives, integrals\n• **Statistics** - data analysis and probability\n• **Discrete Math** - logic, sets, combinatorics\n• **Applied Math** - real-world problem solving\n• **Study techniques** - making math less intimidating\n\nWhat specific math topic are you working on?"
      }

      if (lowerMessage.includes("help me understand") || lowerMessage.includes("explain")) {
        return "🤔 I'd be happy to explain anything! I'm good at breaking down complex topics into simpler parts. Just tell me:\n\n• What specific concept you're trying to understand\n• What level of detail you need\n• If you have any background knowledge on the topic\n• What's confusing you about it\n\nI'll do my best to make it clear and easy to understand! 🐨"
      }

      if (lowerMessage.includes("chat") || lowerMessage.includes("talk")) {
        return "😊 I love chatting! I'm here for whatever you need - whether it's:\n\n• **Deep conversations** about topics you're passionate about\n• **Casual chat** about your day or interests\n• **Problem solving** - working through challenges together\n• **Creative brainstorming** - bouncing ideas around\n• **Just venting** - sometimes you need someone to listen\n\nWhat's on your mind? I'm all ears! 🐨"
      }

      if (lowerMessage.includes("skiing") || lowerMessage.includes("ski")) {
        return "🎿 Ah, skiing! I know you love the slopes! There's something magical about skiing - the focus, the flow, the connection with the mountain. Your CSIA Level 1 certification shows you really understand the fundamentals.\n\nSkiing and learning have so much in common:\n• **Balance** - finding your center\n• **Practice** - repetition builds muscle memory\n• **Progression** - start easy, build up gradually\n• **Mindfulness** - being present in the moment\n\nWhat would you like to chat about? More skiing, or something else? 🐨"
      }

      // Default helpful response
      return `🐨 I'm here to help with whatever you need! I can assist with:\n\n• **Learning & studying** - any subject or topic\n• **Coding & programming** - Python, C, C++, and more\n• **Problem solving** - breaking down complex challenges\n• **Explanations** - making difficult concepts clear\n• **General questions** - pretty much anything!\n• **Just chatting** - I'm a good listener too\n\nWhat would you like to explore together? Feel free to ask me anything! ✨`
    }

    const response = getResponse(lastMessage)

    return NextResponse.json({
      message: response,
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        message: "🐨 Oops! I'm having a little trouble right now. Try asking me something else - I'm here to help! ✨",
      },
      { status: 200 },
    )
  }
}
