import React from 'react'

function DimmedOverlay() {
  return (
    <div style={{
        background: "rgba(255,255,255,0.8)", 
        zIndex: "99999999", 
        position: "fixed", 
        top: "0", 
        left: "0",
        width: "100%",
        height: "100%"    
    }} />
  )
}

export default DimmedOverlay