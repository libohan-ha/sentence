'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send, Pencil, Trash2, X, Save } from 'lucide-react'

interface Sentence {
  _id: string
  english: string
  chinese: string
}

interface SentenceListProps {
  sentences: Sentence[]
  onDelete: (id: string) => void
  onEdit: (id: string, data: { english: string; chinese: string }) => void
}

export default function SentenceList({ sentences, onDelete, onEdit }: SentenceListProps) {
  const [selectedSentence, setSelectedSentence] = useState<Sentence | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({ english: '', chinese: '' })

  const handleEdit = (sentence: Sentence) => {
    setEditMode(true)
    setEditData({ english: sentence.english, chinese: sentence.chinese })
  }

  const handleSave = () => {
    if (selectedSentence) {
      onEdit(selectedSentence._id, editData)
      setEditMode(false)
      setSelectedSentence(null)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {sentences.map((sentence) => (
        <motion.div
          key={sentence._id}
          layoutId={`card-${sentence._id}`}
          onClick={() => !editMode && setSelectedSentence(sentence)}
          className="group relative bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 mt-1 flex-shrink-0" />
            <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-relaxed line-clamp-3">
                {sentence.english}
              </p>
              <p className="text-base sm:text-lg text-white/80 line-clamp-2">
                {sentence.chinese}
              </p>
            </div>
          </div>
          <Send className="absolute right-3 sm:right-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedSentence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={() => !editMode && setSelectedSentence(null)}
          >
            <motion.div
              layoutId={`card-${selectedSentence._id}`}
              className="relative w-full max-w-2xl bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {editMode ? (
                <div className="space-y-4 sm:space-y-6">
                  <textarea
                    value={editData.english}
                    onChange={(e) => setEditData({ ...editData, english: e.target.value })}
                    className="w-full p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl text-lg sm:text-xl lg:text-2xl font-semibold text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/25"
                    rows={3}
                  />
                  <textarea
                    value={editData.chinese}
                    onChange={(e) => setEditData({ ...editData, chinese: e.target.value })}
                    className="w-full p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl text-base sm:text-lg text-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-white/25"
                    rows={3}
                  />
                  <div className="flex justify-end gap-3 sm:gap-4">
                    <motion.button
                      onClick={() => setEditMode(false)}
                      className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      取消
                    </motion.button>
                    <motion.button
                      onClick={handleSave}
                      className="px-3 sm:px-4 py-2 rounded-lg bg-white text-purple-600 hover:bg-white/90 text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <motion.div
                    animate={{ 
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.02, 0.98, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mt-1 flex-shrink-0" />
                    <div className="space-y-3 sm:space-y-4 flex-1 min-w-0">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed break-words">
                        {selectedSentence.english}
                      </p>
                      <p className="text-lg sm:text-xl text-white/90 break-words">
                        {selectedSentence.chinese}
                      </p>
                    </div>
                  </motion.div>
                  
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(selectedSentence)}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        onDelete(selectedSentence._id)
                        setSelectedSentence(null)
                      }}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedSentence(null)}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

