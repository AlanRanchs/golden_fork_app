import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = (props) => {
    // Leer el tema guardado en localStorage o usar 'light' por defecto
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Guardar en localStorage cuando el tema cambie
    useEffect(() => {
        localStorage.setItem('theme', theme);
        // Aplicar la clase al body para los estilos globales
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const contextValue = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
