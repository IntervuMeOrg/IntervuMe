import { useState, useEffect } from 'react';

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
}

interface HelloData {
  message: string;
  version: string;
}

function App() {
  const [backendStatus, setBackendStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [helloData, setHelloData] = useState<HelloData | null>(null);
  const [error, setError] = useState<string>('');

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

  useEffect(() => {
    checkBackendConnection();
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

        {/* Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Connection Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Connection Status
              </h2>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {backendStatus === 'connected' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : backendStatus === 'error' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-4 h-4 rounded-full ${getStatusColor()} shadow-lg`} />
              <span className="text-lg font-semibold text-gray-700">
                {getStatusText()}
              </span>
            </div>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
                <p className="text-red-700 font-medium">
                  {error}
                </p>
              </div>
            )}
            <button
              onClick={checkBackendConnection}
              disabled={backendStatus === 'connecting'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {backendStatus === 'connecting' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Testing Connection...
                </div>
              ) : (
                'Test Connection'
              )}
            </button>
          </div>

          {/* Health Data */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Server Health
              </h2>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            {healthData ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Status</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                      {healthData.status}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Uptime</span>
                    <span className="text-blue-700 font-bold">
                      {Math.floor(healthData.uptime)}s
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Last Check</span>
                    <span className="text-purple-700 font-bold">
                      {new Date(healthData.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Loading health data...</p>
              </div>
            )}
          </div>

          {/* API Response */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                API Response
              </h2>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            {helloData ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                  <div className="mb-2">
                    <span className="text-gray-600 font-medium">Message</span>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    {helloData.message}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Version</span>
                    <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      v{helloData.version}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Loading API response...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="font-medium">Built with React + Vite</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              <span className="font-medium">Powered by Fastify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 