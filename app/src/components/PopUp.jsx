import React from 'react'

export const PopUp = ({ addition, ...props }) => {
   return <div className={`${addition} h-fit absolute right-1/2 top-1/2 translate-x-2/4 translate-y-inv50 transition-all duration-1000`} {...props} />
}
