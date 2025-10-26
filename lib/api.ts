export interface PosePredictionRequest {
  file: File
}

export interface PosePredictionResponse {
  pose: string
  confidence: number
  description: string
  benefits?: string[]
}

export interface YogaPlanRequest {
  level: string
  goal: string
  duration: number
}

export interface YogaPose {
  name: string
  duration: number
  description: string
  type: "warm-up" | "main" | "cool-down"
  focus: string[]
  image?: string
}

export interface YogaPlanResponse {
  level: string
  goal: string
  duration: number
  poses: YogaPose[]
  totalTime: number
}

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://yogamind-backend-1.onrender.com"

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Generic API request handler
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`)
  }

  return response.json()
}

// Pose prediction API - updated to use correct endpoint
export async function predictPose(file: File): Promise<PosePredictionResponse> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/detect_pose_image`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new ApiError(response.status, `Pose prediction failed: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.log("[v0] Pose prediction failed, using mock data:", error)
    // Fallback to mock data if backend is unavailable
    return {
      pose: "Unknown",
      confidence: 0,
      description: "Fallback response due to error",
      benefits: [],
    }
  }
}

export async function predictPoseVideo(file: File): Promise<PosePredictionResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Ensure the endpoint matches the backend route
    const response = await fetch(`${API_BASE_URL}/detect_pose_video`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Pose video prediction failed: ${response.statusText}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error in predictPoseVideo:", error);

    // Throw the error to be handled by the caller
    throw error;
  }
}

// Yoga plan generation API
export async function generateYogaPlan(request: YogaPlanRequest): Promise<YogaPlanResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/generate_routine?level=${request.level}&goal=${request.goal}&duration=${request.duration}`,
      {
        method: "POST",
      },
    )

    if (!response.ok) {
      throw new ApiError(response.status, `Plan generation failed: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      level: request.level,
      goal: request.goal,
      duration: request.duration,
      poses: data.routine.map((item: any) => ({
        name: item.pose,
        duration: item.time_seconds,
        description: item.description,
        type: getPoseType(item.pose),
        focus: getPoseFocus(item.pose),
        image: item.image,
      })),
      totalTime: data.routine.reduce((sum: number, item: any) => sum + item.time_seconds, 0),
    }
  } catch (error) {
    console.log("[v0] Plan generation failed, using mock data:", error)
    // Fallback to mock data if backend is unavailable
    return {
      level: request.level,
      goal: request.goal,
      duration: request.duration,
      poses: [],
      totalTime: 0,
    }
  }
}


// Health check API
export async function healthCheck(): Promise<{ status: string; message: string }> {
  return apiRequest<{ status: string; message: string }>("/health")
}




function getPoseType(poseName: string): "warm-up" | "main" | "cool-down" {
  const poseTypeMap: Record<string, "warm-up" | "main" | "cool-down"> = {
    DownDog: "warm-up",
    Lotus: "cool-down",
    Diamond: "cool-down",
    Warrior2: "main",
    Plank: "main",
    Staff: "main",
    Tree: "main",
    Goddess: "main",
  }
  return poseTypeMap[poseName] || "main"
}

function getPoseFocus(poseName: string): string[] {
  const poseFocusMap: Record<string, string[]> = {
    DownDog: ["Flexibility", "Strength"],
    Warrior2: ["Strength", "Flexibility"],
    Lotus: ["Flexibility", "Relaxation"],
    Plank: ["Strength"],
    Staff: ["Flexibility"],
    Diamond: ["Relaxation"],
    Tree: ["Balance"],
    Goddess: ["Strength", "Flexibility"],
  }
  return poseFocusMap[poseName] || ["Flexibility"]
}
