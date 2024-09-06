import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Feather} from "@expo/vector-icons"
import TabBarButton from './TabBarButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = React.useState({height: 20, width: 100});

    const buttonWidth = dimensions.width/ state.routes.length;
    
    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        });
    }
    

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [{translateX: tabPositionX.value }]
        }
    })

  return (
    <View style={styles.tabBar} onLayout={onTabbarLayout}>
        <Animated.View style={[{
            position: 'absolute',
            backgroundColor: '#723FEB',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25
        },animatedStyle]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label:any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
  
        const isFocused = state.index === index;

        const onPress = () => {

            tabPositionX.value = withSpring(buttonWidth * index, {duration:1500 })

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? '#673ab7': '#222'}
                label={label}
            />
        //   <TouchableOpacity
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     style={styles.tabbarItem}
        //     key={index}
        //   >
        //     {/* @ts-ignore */}
        //     {icon[route.name]({
        //         color: isFocused ? '#673ab7': '#222'
        //     })}
        //     <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffff',
        marginHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})