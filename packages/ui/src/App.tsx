import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  database: string;
}

interface HelloData {
  message: string;
  version: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  created: string;
  updated: string;
}

function App() {
  const [backendStatus, setBackendStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [helloData, setHelloData] = useState<HelloData | null>(null);
  const [error, setError] = useState<string>('');
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkBackendConnection = async () => {
    try {
      setBackendStatus('connecting');
      setError('');

      // Test health endpoint
      const healthResponse = await fetch('/api/health');
      const healthResult: ApiResponse<HealthData> = await healthResponse.json();
      
      if (healthResult.success && healthResult.data) {
        setHealthData(healthResult.data);
      }

      // Test hello endpoint
      const helloResponse = await fetch('/api/hello');
      const helloResult: ApiResponse<HelloData> = await helloResponse.json();
      
      if (helloResult.success && helloResult.data) {
        setHelloData(helloResult.data);
        setBackendStatus('connected');
      } else {
        throw new Error(helloResult.error || 'Failed to connect to API');
      }
    } catch (err) {
      setBackendStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  const handleAuthSuccess = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store in localStorage for persistence
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  useEffect(() => {
    checkBackendConnection();
    
    // Check for existing auth
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'connected': return 'Connected';
      case 'error': return 'Connection Failed';
      default: return 'Connecting...';
    }
  };

  const getDatabaseStatusColor = () => {
    return healthData?.database === 'connected' ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            IntervuMe
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-Powered Mock Interview Platform
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Connection Status Bar */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
                <span className="font-medium text-gray-700">Backend: {getStatusText()}</span>
                {healthData && (
                  <>
                    <div className={`w-3 h-3 rounded-full ${getDatabaseStatusColor()}`}></div>
                    <span className="font-medium text-gray-700">
                      Database: {healthData.database === 'connected' ? 'Connected' : 'Disconnected'}
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={checkBackendConnection}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {isAuthenticated && user && token ? (
          // User Dashboard
          <UserDashboard
            token={token}
            user={user}
            onLogout={handleLogout}
          />
        ) : (
          // Authentication Form
          <div className="max-w-md mx-auto">
            <AuthForm
              mode={authMode}
              onSuccess={handleAuthSuccess}
              onToggleMode={toggleAuthMode}
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Backend Info (when connected) */}
        {backendStatus === 'connected' && helloData && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Backend Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Version:</span>
                <span className="ml-2 font-medium">{helloData.version}</span>
              </div>
              <div>
                <span className="text-gray-600">Message:</span>
                <span className="ml-2 font-medium">{helloData.message}</span>
              </div>
              {healthData && (
                <>
                  <div>
                    <span className="text-gray-600">Uptime:</span>
                    <span className="ml-2 font-medium">{Math.floor(healthData.uptime)}s</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Check:</span>
                    <span className="ml-2 font-medium">
                      {new Date(healthData.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 