'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, MessageCircle } from 'lucide-react'

interface AddSentenceFormProps {
  onAddSentence: (sentence: { english: string; chinese: string }) => void
  onCancel: () => void
}

export default function AddSentenceForm({ onAddSentence, onCancel }: AddSentenceFormProps) {
  const [english, setEnglish] = useState('')
  const [chinese, setChinese] = useState('')
  const [activeField, setActiveField] = useState<'english' | 'chinese' | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddSentence({ english, chinese })
    setEnglish('')
    setChinese('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          type="button"
          onClick={onCancel}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <motion.div 
          className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="space-y-4 sm:space-y-6">
            <div className="relative">
              <motion.div
                animate={activeField === 'english' ? { scale: 1.05 } : { scale: 1 }}
                className="relative"
              >
                <MessageCircle 
                  className={`absolute left-3 sm:left-4 top-3 sm:top-4 transition-colors ${
                    activeField === 'english' ? 'text-white' : 'text-white/60'
                  }`} 
                  size={20} 
                />
                <motion.textarea
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  onFocus={() => setActiveField('english')}
                  onBlur={() => setActiveField(null)}
                  placeholder="Share your favorite English quote..."
                  className="w-full h-24 pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 bg-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25 resize-none text-sm sm:text-base"
                  style={{ backdropFilter: 'blur(12px)' }}
                />
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                animate={activeField === 'chinese' ? { scale: 1.05 } : { scale: 1 }}
                className="relative"
              >
                <Sparkles 
                  className={`absolute left-3 sm:left-4 top-3 sm:top-4 transition-colors ${
                    activeField === 'chinese' ? 'text-white' : 'text-white/60'
                  }`} 
                  size={20} 
                />
                <motion.textarea
                  value={chinese}
                  onChange={(e) => setChinese(e.target.value)}
                  onFocus={() => setActiveField('chinese')}
                  onBlur={() => setActiveField(null)}
                  placeholder="分享你的中文翻译..."
                  className="w-full h-24 pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 bg-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25 resize-none text-sm sm:text-base"
                  style={{ backdropFilter: 'blur(12px)' }}
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              className="w-full group relative flex items-center justify-center py-2 sm:py-3 px-4 bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-xl text-white font-medium transition-colors overflow-hidden text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <motion.div className="relative flex items-center gap-2">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>分享语录</span>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

