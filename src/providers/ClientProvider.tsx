'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useMemo, Suspense } from 'react'
import type { TBaseComponent } from '@/types'

type TAxiosError = {
  response?: {
    status?: number
  }
}

const QUERY_CONFIG = {
  STALE_TIME: 0,
  GC_TIME: 0,
  MAX_RETRIES: 3,
  BASE_RETRY_DELAY: 1000,
  MAX_RETRY_DELAY: 30000,
  CLIENT_ERROR_MIN: 400,
  CLIENT_ERROR_MAX: 500,
  RATE_LIMIT_STATUS: 429,
} as const

const isClientError = (status: number): boolean => {
  return (
    status >= QUERY_CONFIG.CLIENT_ERROR_MIN &&
    status < QUERY_CONFIG.CLIENT_ERROR_MAX
  )
}

const shouldRetryRequest = (failureCount: number, error: Error): boolean => {
  const axiosError = error as TAxiosError
  const status = axiosError?.response?.status

  if (!status) {
    return failureCount < QUERY_CONFIG.MAX_RETRIES
  }

  if (status === QUERY_CONFIG.RATE_LIMIT_STATUS) {
    return false
  }

  if (isClientError(status)) {
    return false
  }

  return failureCount < QUERY_CONFIG.MAX_RETRIES
}

const calculateRetryDelay = (attemptIndex: number): number => {
  const exponentialDelay = QUERY_CONFIG.BASE_RETRY_DELAY * 2 ** attemptIndex
  return Math.min(exponentialDelay, QUERY_CONFIG.MAX_RETRY_DELAY)
}

const ClientProvider = ({ children }: TBaseComponent) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_CONFIG.STALE_TIME,
            gcTime: QUERY_CONFIG.GC_TIME,
            retry: shouldRetryRequest,
            retryDelay: calculateRetryDelay,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div />}>{children}</Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ClientProvider
