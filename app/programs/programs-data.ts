export type ProgramLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels"

export type ProgramSlug =
  | "muscle-building"
  | "endurance-training"
  | "body-toning"
  | "cardio-fat-burning"
  | "personal-trainer"
  | "nutritional-advice"

export interface Program {
  id: number
  slug: ProgramSlug
  name: string
  category: string
  summary: string
  description: string
  duration: string
  frequency: string
  difficulty: ProgramLevel
  image: string
  focus: string
  audience: string
  philosophy: string
  durationPerSession?: string
  weeklyFrequency?: string
  equipment: string[]
  trainingStyle: string
  caloriesBurnEstimate?: string
}

export const programs: Program[] = [
  {
    id: 1,
    slug: "muscle-building",
    name: "Muscle Building",
    category: "strength",
    summary: "Build serious muscle mass and strength through progressive overload and evidence-based hypertrophy training.",
    description:
      "Our Muscle Building program is designed for those committed to increasing muscle size and strength. We combine compound movements, progressive overload principles, and targeted accessory work to maximize hypertrophy. Every session is structured to challenge your muscles progressively, ensuring continuous growth and development.",
    duration: "60 minutes",
    durationPerSession: "60 minutes",
    frequency: "3-5x per week",
    weeklyFrequency: "3–5 sessions per week",
    difficulty: "Intermediate",
    image: "/images/program-strength.jpg",
    focus: "Progressive overload, compound strength movements, and hypertrophy-focused training protocols.",
    audience:
      "Members with basic training experience who want to build significant muscle mass and increase overall strength.",
    philosophy:
      "Muscle growth requires consistent progressive challenge. We prioritize proper form, controlled progression, and adequate recovery to build muscle that lasts.",
    equipment: ["Barbells", "Dumbbells", "Power racks", "Cable machines", "Smith machines"],
    trainingStyle: "Periodized strength and hypertrophy blocks with progressive volume increases.",
    caloriesBurnEstimate: "400–650 kcal per session (varies by intensity and bodyweight).",
  },
  {
    id: 2,
    slug: "endurance-training",
    name: "Endurance Training",
    category: "cardio",
    summary: "Build exceptional stamina and long-term performance capacity through structured endurance protocols.",
    description:
      "Our Endurance Training program focuses on developing your cardiovascular capacity and muscular endurance. Through carefully structured sessions that combine steady-state training, tempo work, and interval conditioning, you'll build the stamina needed for sustained performance. Perfect for athletes and active individuals who want to push their limits.",
    duration: "45-60 minutes",
    durationPerSession: "45–60 minutes",
    frequency: "3-4x per week",
    weeklyFrequency: "3–4 sessions per week",
    difficulty: "Intermediate",
    image: "/images/hiit.jpg",
    focus: "Cardiovascular conditioning, muscular endurance, and long-term performance capacity.",
    audience:
      "Athletes, runners, and fitness enthusiasts who want to improve their stamina and ability to sustain high-intensity efforts.",
    philosophy:
      "Endurance is built through consistent, progressive training. We structure sessions to challenge your aerobic and anaerobic systems while ensuring sustainable progress.",
    equipment: ["Treadmills", "Rowing machines", "Assault bikes", "Ellipticals", "Resistance equipment"],
    trainingStyle: "Structured endurance blocks combining steady-state, tempo, and interval training.",
    caloriesBurnEstimate: "500–750 kcal per session (varies by intensity and duration).",
  },
  {
    id: 3,
    slug: "body-toning",
    name: "Body Toning",
    category: "functional",
    summary: "Sculpt and define your physique with targeted training that builds lean muscle and enhances definition.",
    description:
      "Our Body Toning program is designed to help you achieve a lean, defined physique through a combination of strength training and metabolic conditioning. We focus on building lean muscle mass while reducing body fat, creating the sculpted, toned appearance you're working toward. Every session targets multiple muscle groups for maximum efficiency.",
    duration: "45-60 minutes",
    durationPerSession: "45–60 minutes",
    frequency: "3-4x per week",
    weeklyFrequency: "3–4 sessions per week",
    difficulty: "All Levels",
    image: "/images/program-functional.jpg",
    focus: "Lean muscle development, body composition improvement, and enhanced muscle definition.",
    audience:
      "Members who want to build a lean, toned physique with visible muscle definition and improved body composition.",
    philosophy:
      "Toning comes from the perfect balance of strength training and conditioning. We emphasize form, control, and progressive challenge to sculpt your ideal physique.",
    equipment: ["Dumbbells", "Resistance bands", "Cable machines", "Bodyweight stations", "Kettlebells"],
    trainingStyle: "Circuit-based training combining strength work with metabolic conditioning for optimal toning.",
    caloriesBurnEstimate: "400–600 kcal per session.",
  },
  {
    id: 4,
    slug: "cardio-fat-burning",
    name: "Cardio (Fat Burning)",
    category: "cardio",
    summary: "Maximize calorie burn and accelerate fat loss through high-intensity cardio and metabolic training.",
    description:
      "Our Cardio (Fat Burning) program is specifically designed to maximize calorie expenditure and boost your metabolism. Through high-intensity interval training (HIIT), metabolic circuits, and targeted cardio protocols, you'll burn significant calories both during and after your workout. This program is ideal for those focused on fat loss and improving metabolic health.",
    duration: "30-45 minutes",
    durationPerSession: "30–45 minutes",
    frequency: "4-5x per week",
    weeklyFrequency: "4–5 sessions per week",
    difficulty: "Intermediate",
    image: "/images/program-recovery.jpg",
    focus: "Maximum calorie burn, fat loss, and metabolic conditioning through high-intensity training.",
    audience:
      "Members focused on fat loss, improving cardiovascular health, and maximizing calorie burn in efficient sessions.",
    philosophy:
      "Fat loss happens when you create a significant calorie deficit through training. We structure high-intensity sessions that maximize both immediate and post-exercise calorie burn.",
    equipment: ["Treadmills", "Assault bikes", "Rowing machines", "Kettlebells", "Battle ropes"],
    trainingStyle: "High-intensity interval training (HIIT) and metabolic circuits with strategic work/rest ratios.",
    caloriesBurnEstimate: "500–800+ kcal per session (including post-exercise metabolic boost).",
  },
  {
    id: 5,
    slug: "personal-trainer",
    name: "Personal Trainer",
    category: "1-on-1",
    summary: "Work one-on-one with an expert coach for personalized training plans tailored to your unique goals.",
    description:
      "Our Personal Trainer service provides you with dedicated, one-on-one coaching from certified fitness professionals. Your trainer will design a completely customized program based on your goals, fitness level, schedule, and preferences. Receive hands-on guidance, real-time form corrections, and ongoing program adjustments to ensure you're always progressing toward your objectives.",
    duration: "60 minutes",
    durationPerSession: "60 minutes",
    frequency: "Flexible",
    weeklyFrequency: "1–4+ sessions per week depending on your goals and schedule.",
    difficulty: "All Levels",
    image: "/images/program-personal.jpg",
    focus: "Fully personalized training, expert coaching, and accountability for maximum results.",
    audience:
      "Members who want the fastest path to results, need specialized guidance, or prefer individualized attention and support.",
    philosophy:
      "Personal training is the highest-leverage investment in your fitness journey. Every exercise, rep, and progression is designed specifically for you and your goals.",
    equipment: ["Full access to all gym equipment, customized to your program and goals"],
    trainingStyle: "Fully customized programming with one-on-one coaching, form correction, and ongoing adjustments.",
  },
  {
    id: 6,
    slug: "nutritional-advice",
    name: "Nutritional Advice",
    category: "functional",
    summary: "Get expert nutrition guidance to support your training goals and optimize your results.",
    description:
      "Our Nutritional Advice service connects you with certified nutrition professionals who will help you develop healthy eating habits that support your fitness goals. Whether you're looking to build muscle, lose fat, improve performance, or simply maintain a balanced lifestyle, our nutrition experts will create a personalized meal plan and provide ongoing guidance to ensure you're fueling your body for success.",
    duration: "Consultation-based",
    durationPerSession: "60 minutes (initial consultation)",
    frequency: "Ongoing support",
    weeklyFrequency: "Weekly check-ins and adjustments as needed.",
    difficulty: "All Levels",
    image: "/images/program-group.jpg",
    focus: "Personalized nutrition planning, healthy habit formation, and results-driven meal strategies.",
    audience:
      "Members who want to optimize their nutrition to support training goals, improve body composition, or develop sustainable healthy eating habits.",
    philosophy:
      "Nutrition is the foundation of all fitness results. We provide evidence-based guidance to help you fuel your body properly and achieve your goals faster.",
    equipment: ["Nutritional assessment tools", "Meal planning resources", "Progress tracking systems"],
    trainingStyle: "One-on-one consultations with personalized meal plans, habit coaching, and ongoing support.",
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  const normalized = decodeURIComponent(slug).toLowerCase()
  return programs.find((program) => program.slug === normalized)
}

