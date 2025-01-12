'use client'

import { useState, useEffect } from 'react'
import SentenceList from '../components/SentenceList'
import AddSentenceForm from '../components/AddSentenceForm'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface Sentence {
  _id: string;
  english: string;
  chinese: string;
}

export default function Home() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    try {
      const response = await fetch('/api/sentences');
      const data = await response.json();
      setSentences(data);
    } catch (error) {
      console.error('Failed to fetch sentences:', error);
    }
  };

  const handleAddSentence = async (newSentence: { english: string; chinese: string }) => {
    try {
      const response = await fetch('/api/sentences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSentence),
      });
      const data = await response.json();
      setSentences((prev) => [data, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add sentence:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/sentences/${id}`, {
        method: 'DELETE',
      });
      setSentences((prev) => prev.filter(sentence => sentence._id !== id));
    } catch (error) {
      console.error('Failed to delete sentence:', error);
    }
  };

  const handleEdit = async (id: string, data: { english: string; chinese: string }) => {
    try {
      const response = await fetch(`/api/sentences/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const updatedSentence = await response.json();
      setSentences((prev) => 
        prev.map(sentence => 
          sentence._id === id ? updatedSentence : sentence
        )
      );
    } catch (error) {
      console.error('Failed to update sentence:', error);
    }
  };

  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <motion.h1 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            我的语录
          </motion.h1>
          <motion.button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>添加语录</span>
          </motion.button>
        </div>
        
        {showForm && (
          <AddSentenceForm 
            onAddSentence={handleAddSentence} 
            onCancel={() => setShowForm(false)} 
          />
        )}
        
        <SentenceList 
          sentences={sentences} 
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </main>
  )
}

