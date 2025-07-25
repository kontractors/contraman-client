import {type NavigateFunction, Outlet, useHref, useNavigate} from "react-router";
import {Button, HeroUIProvider, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import {Navigator, useShiftShift} from "./features/navigator";
import {useAppDispatch} from "./app/hooks.ts";
import {openPalette} from "./features/navigator/navigatorSlice.ts";
import {useEffect} from "react";
import {registerAllActions} from "./app/actions";
import {ToastProvider} from "@heroui/toast";

function MainNavbar(props: { navigate: NavigateFunction }) {
    return <>
        <Navigator onNavigate={(href) => props.navigate(href)}/>
        <Navbar className={"w-full"}>
            <NavbarBrand>
                <Button as={Link} href="/">
                    Home
                </Button>
            </NavbarBrand>
            <NavbarContent>
                <NavbarItem>
                    <Button variant={"ghost"} as={Link} href="/signup">
                        Signup
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="/login">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    </>;
}

export default function Layout() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    useShiftShift(() => dispatch(openPalette()))

    useEffect(() => {
        registerAllActions();
    }, []);

    return (
        <HeroUIProvider useHref={useHref} navigate={navigate} className={"w-full h-full"}>
            <ToastProvider/>
            <MainNavbar navigate={navigate}/>
            <Outlet/>
        </HeroUIProvider>
    );
};