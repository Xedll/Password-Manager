import React from 'react'

export const CustomText = ({ addition, ...props }) => {
   return <div className={`font-roboto whitespace-break-spaces text-text ${addition}`} {...props} />
}
