import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import icon from '@/constants/Icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label}:any) => {
    const scale = useSharedValue(0);

    React.useEffect(()=>{
        scale.value = withSpring(typeof isFocused === 'boolean'? (isFocused ? 1 : 0): isFocused, {duration: 350})
    },[scale, isFocused]);

    // @ts-ignore
    const animatedIconStyle = useAnimatedStyle(()=>{
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

        const top = interpolate(scale.value, [0, 1], [0, 9]);

        return {
            transform: [{
                scale: scaleValue
            }],
            top
        } 
    })

    const animatedTextStyle = useAnimatedStyle(()=>{
        const opacity = interpolate(scale.value, [0, 1], [1, 0])

        return {opacity};
    })

  return (
    <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
        <Animated.View
            style={[animatedIconStyle]}
        >
            {/* @ts-ignore */}
            {icon[routeName]({
                    color: isFocused ? '#FFF': '#222',
                    isFocused
                })}
        </Animated.View>
            <Animated.Text style={[{ color: isFocused ? '#FFF' : '#222' , fontSize: 12}, animatedTextStyle]}>
              {label}
            </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton;

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})