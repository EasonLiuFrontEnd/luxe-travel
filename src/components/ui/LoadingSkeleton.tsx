import React from 'react'

interface LoadingSkeletonProps {
  className?: string
  height?: string
  width?: string
  rounded?: boolean
  children?: React.ReactNode
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = true,
  children
}) => {
  return (
    <div 
      className={`
        bg-gray-200 animate-pulse 
        ${height} ${width} 
        ${rounded ? 'rounded' : ''} 
        ${className}
        flex items-center justify-center
      `}
    >
      {children && (
        <div className="text-gray-500 text-sm">
          {children}
        </div>
      )}
    </div>
  )
}

export default LoadingSkeleton
