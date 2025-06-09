const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // Authentication
  async login(username: string, password: string) {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    if (response.token) {
      this.token = response.token
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
    }

    return response
  }

  async register(userData: RegisterData) {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Movies
  async getMovies(page = 0, size = 20) {
    return this.request<MovieResponse>(`/movies?page=${page}&size=${size}`)
  }

  async getMovieById(id: number) {
    return this.request<Movie>(`/movies/${id}`)
  }

  async searchMovies(query: string) {
    return this.request<Movie[]>(`/movies/search?query=${encodeURIComponent(query)}`)
  }

  async getMoviesByGenre(genre: string) {
    return this.request<Movie[]>(`/movies/genre/${encodeURIComponent(genre)}`)
  }

  async getMovieEpisodes(movieId: number) {
    return this.request<Episode[]>(`/movies/${movieId}/episodes`)
  }

  // User
  async getUserProfile() {
    return this.request<User>("/users/profile")
  }

  async getUserFavorites() {
    return this.request<Movie[]>("/users/favorites")
  }

  async addToFavorites(movieId: number) {
    return this.request<void>(`/users/favorites/${movieId}`, {
      method: "POST",
    })
  }

  async getWatchHistory() {
    return this.request<WatchHistory[]>("/users/history")
  }

  // Streaming
  getStreamUrl(movieId: number, episode: number) {
    return `${this.baseURL}/stream/${movieId}/${episode}`
  }
}

// Types
interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

interface Movie {
  id: number
  title: string
  englishTitle?: string
  description: string
  year: number
  status: string
  quality: string
  rating: number
  posterUrl: string
  genres: string[]
  totalEpisodes: number
  currentEpisode: number
}

interface Episode {
  id: number
  episodeNumber: number
  title: string
  videoUrl: string
  duration: number
  isWatched: boolean
}

interface User {
  id: number
  username: string
  email: string
  displayName: string
  avatar?: string
}

interface WatchHistory {
  id: number
  movie: Movie
  episode: Episode
  watchedAt: string
  progress: number
}

interface MovieResponse {
  content: Movie[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export const apiClient = new ApiClient(API_BASE_URL)
export type { Movie, Episode, User, WatchHistory, AuthResponse, RegisterData }
