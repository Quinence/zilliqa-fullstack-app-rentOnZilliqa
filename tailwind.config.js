module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
    theme: {
        extend: {
            borderRadius: {
                button: "8px",
            },
            scale: {
                down: ".99",
                up: "1.01",
            },
            colors: {
                gray: {
                    100: "#f5f5f5",
                    200: "#eeeeee",
                    300: "#e7e7e7",
                    400: "#bdbdbd",
                    500: "#9e9e9e",
                    600: "#757575",
                    700: "#616161",
                    800: "#424242",
                    900: "#212121",
                },
            },
            boxShadow: {
                button: "0 3px 25px 0 rgba(0, 0, 0, 0.3)",
                card: "0 3px 30px 0 rgba(0, 0, 0, 0.2)",
            },
        },
    },
    variants: {},
};
