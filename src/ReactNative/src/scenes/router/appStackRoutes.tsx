import React, {useEffect} from "react";
import {APP_STACK_ROUTES, getRouteOptionsFromPath} from "./constants";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeIndex from "../appStack/home/homeScreen";
import AppTabBar from "./tabBarComponents";
import {createStackNavigator} from "@react-navigation/stack";
import UserMenu from "../appStack/home/userMenu/userMenu";
import Assessment from "../appStack/assessment/assessment";
import {useSelector} from "react-redux";
import {getCurrentAssessmentUuid} from "@reduxShared/models/assessments/selectors";
import NavigationService from "../../services/navigationService";
import PastAssessments from "../appStack/home/userMenu/pastAssessments";
import SetHealthAuthority from "../appStack/home/userMenu/healthAuthority/setHealthAuthority";

const PrimaryStack = createStackNavigator();
const AppStackNavigator = () => {
    useAssessmentMonitor();
    return (
        <PrimaryStack.Navigator>
            <PrimaryStack.Screen
                name={APP_STACK_ROUTES.HOME.INDEX.path}
                component={StackWithBottomTabs}
                options={{headerShown: false}}
            />
            <PrimaryStack.Screen
                name={APP_STACK_ROUTES.ASSESSMENTS.NEW.path}
                component={Assessment}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </PrimaryStack.Navigator>
    );
};

export default AppStackNavigator;

const isTabBarVisibleOnCurrentNestedScreen = (route: any): false | undefined => {
    const state = route.route.state;
    const routes = state?.routes;
    const currentRouteName = routes ? routes[state.index]?.name : route.route.name;
    return getRouteOptionsFromPath(currentRouteName).tabBarVisible;
};

const BottomTab = createBottomTabNavigator();
const StackWithBottomTabs: React.FC = () => (
    <BottomTab.Navigator tabBar={(props) => <AppTabBar {...props} />}>
        <BottomTab.Screen
            name={APP_STACK_ROUTES.HOME.INDEX.path}
            component={HomeIndex}
            options={{
                tabBarLabel: APP_STACK_ROUTES.HOME.INDEX.label,
                tabBarAccessibilityLabel: APP_STACK_ROUTES.HOME.INDEX.label,
            }}
        />
        <BottomTab.Screen
            name={APP_STACK_ROUTES.USER.MENU.path}
            component={UserMenuStackNavigator}
            options={(route) => ({
                tabBarLabel: APP_STACK_ROUTES.USER.MENU.label,
                tabBarAccessibilityLabel: APP_STACK_ROUTES.USER.MENU.label,
                tabBarVisible: isTabBarVisibleOnCurrentNestedScreen(route),
            })}
        />
    </BottomTab.Navigator>
);

const UserMenuStack = createStackNavigator();
const UserMenuStackNavigator = () => {
    useAssessmentMonitor();
    return (
        <UserMenuStack.Navigator>
            <UserMenuStack.Screen
                name={APP_STACK_ROUTES.USER.MENU.path}
                component={UserMenu}
                options={{
                    title: APP_STACK_ROUTES.USER.MENU.label,
                    headerShown: false,
                }}
            />
            <UserMenuStack.Screen
                name={APP_STACK_ROUTES.USER.PAST_ASSESSMENTS_LIST.path}
                component={PastAssessments}
                options={{
                    title: APP_STACK_ROUTES.USER.PAST_ASSESSMENTS_LIST.label,
                }}
            />
            <UserMenuStack.Screen
                name={APP_STACK_ROUTES.USER.SET_HEALTH_AUTHORITY.path}
                component={SetHealthAuthority}
                options={{
                    title: APP_STACK_ROUTES.USER.SET_HEALTH_AUTHORITY.label,
                }}
            />
        </UserMenuStack.Navigator>
    );
};

const useAssessmentMonitor = (): void => {
    const assessmentUuid = useSelector(getCurrentAssessmentUuid);
    useEffect(() => {
        if (assessmentUuid) {
            NavigationService.navigate(APP_STACK_ROUTES.ASSESSMENTS.NEW.path);
        }
    });
};
