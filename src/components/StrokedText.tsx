import React from 'react';
import { View, Text, TextProps, StyleSheet, TextStyle } from 'react-native';

type Props = TextProps & {
  children: React.ReactNode;
  strokeColor?: string;
  strokeWidth?: number; // how far the outline spreads (in pixels)
  style?: TextStyle;
};

/**
 * StrokedText
 * Implements a text outline (stroke) without external libs by stacking
 * multiple Text elements around the main filled Text. This avoids Tailwind
 * and uses plain React Native styles.
 *
 * Props:
 * - strokeColor: color of the outline (default: '#000')
 * - strokeWidth: thickness/offset in px (default: 1)
 * - style: Text style applied to the main (filled) text
 */
export default function StrokedText({
  children,
  strokeColor = '#000',
  strokeWidth = 1,
  style,
  ...rest
}: Props) {
  // Build offsets for 8 directions (N, S, E, W + diagonals) scaled by strokeWidth
  const offsets = [
    { x: -strokeWidth, y: 0 },
    { x: strokeWidth, y: 0 },
    { x: 0, y: -strokeWidth },
    { x: 0, y: strokeWidth },
    { x: -strokeWidth, y: -strokeWidth },
    { x: strokeWidth, y: -strokeWidth },
    { x: -strokeWidth, y: strokeWidth },
    { x: strokeWidth, y: strokeWidth },
  ];

  return (
    <View style={styles.wrapper} pointerEvents="none">
      {offsets.map((o, i) => (
        <Text
          key={i}
          {...rest}
          style={[
            styles.stroke,
            { color: strokeColor, left: o.x, top: o.y },
            style,
          ]}
        >
          {children}
        </Text>
      ))}

      {/* Main filled text (on top) */}
      <Text {...rest} style={[styles.fill, style]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  stroke: {
    position: 'absolute',
    textAlign: 'left',
    includeFontPadding: false,
  },
  fill: {
    position: 'relative',
    includeFontPadding: false,
  },
});
