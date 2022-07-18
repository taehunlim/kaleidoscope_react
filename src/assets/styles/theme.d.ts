declare const theme: {
    deviceSize: {
        desktop: string;
        laptop: string;
        tablet: string;
        mobile: string;
    };

    bgColor: {
        lightMode: string;
        darkMode: string;
    };
    fontColor: {
        lightMode: string;
        darkMode: string;
    };
    color: {
        primary: string;
        danger: string;
        white: string;
        black: string;
        black_bold: string;
        gray: string;
        gray_two: string;
    };

    layoutComponent: {
        header_height: number;
        grid_gutter_width: number;
        footer_height: number;
        sideBarWidth: number;
        sideBarWidth_collapsed: number;
    };
};
export default theme;
