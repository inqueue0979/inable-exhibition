export async function POST(request) {
  try {
    const body = await request.json();

    // Flask 서버로 요청 전달
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';
    const response = await fetch(`${apiBaseUrl}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Flask server error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json(
      { error: '평가 서버에 연결할 수 없습니다.' },
      { status: 500 }
    );
  }
}