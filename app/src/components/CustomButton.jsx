import React from 'react'

export const CustomButton = ({ addition, ...props }) => {
   return <button className={`${addition} text-text border-2 border-solid border-primary py-1 px-2`} {...props} />
}
