import React from 'react';
import {Text as RNText, type TextProps as RNTextProps} from 'react-native';

interface TextProps extends RNTextProps {
  text: string;
}

export const Text = (props: TextProps) => {
  const {text} = props;
  return <RNText>{text}</RNText>;
};
