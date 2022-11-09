import {useEffect} from "react";

export const useChangeTheme = (dark: boolean) => {

    useEffect(() => {
        document.body.setAttribute('data-theme', `${dark ? 'dark' : 'light'}`);
    }, [dark]);
}