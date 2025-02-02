/* eslint-disable no-unused-vars */
import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'


const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker 
      color={snap.color}
      disableAlpha
      presetColors={
        [
          "#FFFFFF", // white
          "#FF5733", // Vibrant Orange-Red
          "#33A1FF", // Bright Blue
          "#28B463", // Lively Green
          "#F1C40F", // Bold Yellow
          "#9B59B6", // Rich Purple
          "#E74C3C", // Striking Red
          "#1ABC9C", // Fresh Turquoise
          "#34495E", // Deep Slate (Blue-Gray)
          "#E67E22", // Warm Orange
          "#2ECC71"  // Energetic Green
        ]
      }
      onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker