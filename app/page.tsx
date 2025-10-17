export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900">Job Tracker</h1>
        <p className="text-xl text-gray-600">Keep track of your applications in one place</p>
        
        <div className="flex gap-4 justify-center mt-8">
          <a 
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign in
          </a>
          <a 
            href="/register"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Create account
          </a>
        </div>
      </div>
    </div>
  )
}
