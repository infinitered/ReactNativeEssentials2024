import FeatherIcons from '@expo/vector-icons/Feather'
import React from 'react'

import { colors } from '../../../shared/theme'

export interface IconProps {
  name: keyof typeof FeatherIcons.glyphMap
  size?: number
  color?: string
}

export const Icon = (props: IconProps) => {
  const { name, size = 24, color = colors.tint.base } = props

  return <FeatherIcons name={name} size={size} color={color} />
}
