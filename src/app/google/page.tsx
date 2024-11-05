//claude 11/4
'use client'
import { useSession, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function SignIn() {
  const { data: session } = useSession()

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { redirect: false })
    
    if (result?.ok && session?.user) {
      // Log the entire session object
      console.log('Full session data:', JSON.stringify(session, null, 2))
      console.log('User data:', JSON.stringify(session.user, null, 2))

      const {firstName, lastName, email, image } = session.user
      
      // Log the exact data being sent to the API
      const userData = { firstName, lastName, email, image }
      console.log('Data being sent to API:', JSON.stringify(userData, null, 2))

      try {
        const response = await fetch("/api/verify-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)
      } catch (error) {
        console.error('Error verifying user:', error)
      }
    }
  }

  // Add this to see session updates
  console.log('Current session:', session)

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
        }}
      >
        <FcGoogle size={20} style={{ marginRight: "10px" }} />
        Sign in with Google
      </button>

      {/* Add this to display the session data on the page */}
      {session && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <h3>Session Data:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}