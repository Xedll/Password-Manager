import React from 'react'

export const CustomInput = ({ addition, ...props }) => {
   return <input className={`${addition} bg-bg border-solid border-2 border-primary text-text font-roboto focus:outline-0 focus:border-accent p-1`} {...props} />
}
