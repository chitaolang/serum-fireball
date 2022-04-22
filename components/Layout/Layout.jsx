import React from 'react'
import Nav from '../Nav'

export default function Layout({ children }) {
  return (
    <>
      <Nav/>
      <main>{children}</main>
    </>
  )
}