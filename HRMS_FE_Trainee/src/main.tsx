import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MainThemeLayout from "./layout/themeLayout.tsx";
import { AuthProvider } from "./Context/ContextToken.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Toasters from "./common/Toasters.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <MainThemeLayout>
      <Toasters />
      <App />
      <Toaster />
    </MainThemeLayout>
  </AuthProvider>
);
