import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import FloatingChatButtons from "./components/FloatingChatButtons";
import { AIChatbot } from "./components/AIChatbot";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import BuyingGuide from "./pages/BuyingGuide";
import AreaGuide from "./pages/AreaGuide";
import Concierge from "./pages/Concierge";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import PartnersList from "./pages/PartnersList";
import KitsCorner from "./pages/KitsCorner";
import Events from "./pages/Events";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/properties" component={Properties} />
          <Route path="/properties/:id" component={PropertyDetail} />
          <Route path="/area-guide" component={AreaGuide} />
          <Route path="/buying-guide" component={BuyingGuide} />
          <Route path="/concierge" component={Concierge} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/partners" component={PartnersList} />
          <Route path="/kits-corner" component={KitsCorner} />
          <Route path="/events" component={Events} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <FloatingChatButtons />
          <AIChatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
