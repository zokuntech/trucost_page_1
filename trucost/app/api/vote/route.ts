import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { suggestions, email } = body;

    // Format the data for the Lambda function - send only the first suggestion
    const suggestion = suggestions[0]; // Take the first suggestion since Lambda expects single vote
    const formattedData = {
      product_id: suggestion.id,
      product_name: suggestion.name,
      ...(email && { email })
    };

    // Call the Lambda function
    const response = await fetch('https://iq2qm2pj28.execute-api.us-west-2.amazonaws.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      throw new Error('Lambda API call failed');
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in vote API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process vote' },
      { status: 500 }
    );
  }
} 