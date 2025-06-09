"use client"

import { useState, useEffect } from "react"
import { apiClient, type Movie } from "@/lib/api"

export function useMovies(page = 0, size = 20) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getMovies(page, size)
        setMovies(response.content)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movies")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page, size])

  return { movies, loading, error, totalPages }
}

export function useMovie(id: number) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const movieData = await apiClient.getMovieById(id)
        setMovie(movieData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movie")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMovie()
    }
  }, [id])

  return { movie, loading, error }
}
