import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const MainThemeLayout = ({ children }: { children: ReactNode }) => {
  return (
   <Provider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="light">
      {children}
    </ThemeProvider>
 </Provider>
  );
};

export default MainThemeLayout;
