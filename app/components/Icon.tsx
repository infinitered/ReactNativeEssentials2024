import FeatherIcon from 'react-native-vector-icons/Feather'
import featherJson from 'react-native-vector-icons/glyphmaps/Feather.json'
import { colors } from '../../shared/theme'

interface IconProps {
  name: keyof typeof featherJson
  size?: number
  color?: string
}
export const Icon: React.FC<IconProps> = props => {
  const { name, size = 24, color = colors.tint.base } = props

  return <FeatherIcon name={name} size={size} color={color} />
}
