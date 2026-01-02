import { Outlet } from 'react-router-dom';
import { DashSidebar } from './DashSidebar';
import { DashHeader } from './DashHeader';
import { MobileNav } from './MobileNav';
import { LoginModal } from './LoginModal';
import { useDashAuth } from '@/hooks/useDashAuth';

export const DashLayout = () => {
  const { user, isAuthenticated, isLoading, login, logout, isAdmin } = useDashAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#121212' }}>
        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginModal onLogin={login} />;
  }

  return (
    <div 
      className="min-h-screen flex"
      style={{ background: '#121212' }}
    >
      {/* Desktop Sidebar */}
      <DashSidebar isAdmin={isAdmin()} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0">
        <DashHeader user={user} onLogout={logout} />
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isAdmin={isAdmin()} />
    </div>
  );
};
