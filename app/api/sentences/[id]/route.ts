import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sentence from '@/models/Sentence';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    const sentence = await Sentence.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(sentence);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sentence' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Sentence.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Sentence deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sentence' }, { status: 500 });
  }
} 