import { Feather, Ionicons } from "@expo/vector-icons";

const icon = {
    index: (props: any) => ( props.isFocused ?<Ionicons name="home" size={24} color={props.color} /> : <Ionicons name="home-outline" size={24} color={props.color} />), 
    explore: (props: any) => (props.isFocused ?<Ionicons name="compass" size={24} color={props.color} /> : <Ionicons name="compass-outline" size={24} color={props.color} />), 
    profile: (props: any) => (props.isFocused ? <Ionicons name="person" size={24} color={props.color} /> : <Ionicons size={24} name="person-outline" />), 
}

export default icon;