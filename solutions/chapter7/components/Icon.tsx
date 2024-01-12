import React from 'react'
import VectorIcon from 'react-native-vector-icons/Feather'
import featherJson from 'react-native-vector-icons/glyphmaps/Feather.json'

import { colors } from '../../../shared/theme'

export interface IconProps {
  name: keyof typeof featherJson
  size?: number
  color?: string
}

export const Icon = (props: IconProps) => {
  const { name, size = 24, color = colors.tint.base } = props

  return <VectorIcon name={name} size={size} color={color} />
}
