import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { GrokResponse } from '@/app/types/grok';

const GROK_API_URL = 'https://api.groq.com/openai/v1/chat/completions';  
const GROK_API_KEY = process.env.GROK_API_KEY;
console.log(GROK_API_KEY)

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const fullMessages = [
    { role: 'system', content: 'You are a helpful and friendly customer support agent for a tech company. Your goal is to assist customers with their inquiries and problems in a professional and courteous manner.' },
    ...messages
  ];
  try {
    const response = await axios.post<GrokResponse>(
      GROK_API_URL,
      {
        messages: fullMessages,
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${GROK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error calling Grok API:', error);
    return NextResponse.json({ error: 'Failed to get response from Grok' }, { status: 500 });
  }
}