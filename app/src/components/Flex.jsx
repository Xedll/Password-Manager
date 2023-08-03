import React from 'react'

export const Flex = ({ addition, ...props }) => {
   return <div className={`${addition} flex flex-wrap gap-1`}{...props} />
}
