import React from 'react'
import {Switch as RNSwitch, View, ViewStyle} from 'react-native'
import {colors} from '../../../shared/theme'

interface SwitchProps {
  isEnabled: boolean
  toggleSwitch: () => void
}

export const Switch = (props: SwitchProps) => {
  const {isEnabled, toggleSwitch} = props
  return (
    <View style={$container}>
      <RNSwitch
        ios_backgroundColor={
          isEnabled
            ? colors.tokens.backgroundSwitchTrackOn
            : colors.tokens.backgroundSwitchTrackOff
        }
        onValueChange={toggleSwitch}
        thumbColor={
          isEnabled
            ? colors.tokens.backgroundSwitchThumbOn
            : colors.tokens.backgroundSwitchThumbOff
        }
        trackColor={{
          false: colors.tokens.backgroundSwitchTrackOff,
          true: colors.tokens.backgroundSwitchTrackOn,
        }}
        value={isEnabled}
      />
    </View>
  )
}

const $container: ViewStyle = {
  alignItems: 'center',
  height: 31,
  justifyContent: 'center',
  width: 51,
}
