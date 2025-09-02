import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/user/Dashboard";
import Jobs from "./pages/user/Jobs";
import Resume from "./pages/user/Resume";
import Applications from "./pages/user/Applications";
import GapAnalyzer from "./pages/user/GapAnalyzer";
import Resources from "./pages/user/Resources";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminResponses from "./pages/admin/AdminResponses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* User routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={
                <ProtectedRoute requiredRole="user">
                  <Jobs />
                </ProtectedRoute>
              } />
              <Route path="/resume" element={
                <ProtectedRoute requiredRole="user">
                  <Resume />
                </ProtectedRoute>
              } />
              <Route path="/applications" element={
                <ProtectedRoute requiredRole="user">
                  <Applications />
                </ProtectedRoute>
              } />
              <Route path="/gap-analyzer" element={
                <ProtectedRoute requiredRole="user">
                  <GapAnalyzer />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute requiredRole="user">
                  <Resources />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminJobs />
                </ProtectedRoute>
              } />
              <Route path="/admin/responses" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminResponses />
                </ProtectedRoute>
              } />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
