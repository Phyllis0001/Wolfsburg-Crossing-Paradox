import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex-1 py-[5px] px-[7px] text-[0.6rem] font-[inherit]',
        'border border-[rgba(255,255,255,0.09)] rounded-[2px]',
        'bg-[rgba(255,255,255,0.04)] text-[#DDD8F8]',
        'outline-none transition-[border-color] duration-200',
        'focus:border-[#F5C000]',
        'placeholder:text-[#7778A0]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
