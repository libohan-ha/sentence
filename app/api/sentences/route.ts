import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sentence from '@/models/Sentence';

export async function GET() {
  try {
    await connectDB();
    const sentences = await Sentence.find({}).sort({ createdAt: -1 });
    return NextResponse.json(sentences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sentences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const sentence = await Sentence.create(body);
    return NextResponse.json(sentence);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sentence' }, { status: 500 });
  }
} 