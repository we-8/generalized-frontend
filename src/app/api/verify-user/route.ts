//claude 11/4
export async function POST(request: Request) {
    try {
      const { username, firstName, lastName, email, image } = await request.json()
      
      // Log received data
      console.log('Received data:', { username, firstName, lastName, email, image })
      
      return new Response(JSON.stringify({ message: 'User data received successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }