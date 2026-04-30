import Groq from 'groq-sdk'
import env from '#start/env'
import type { AI } from '#types'

const groq = new Groq({
  apiKey: env.get('GROQ_API_KEY') as string,
})

class AIService {
  public async processTranscript(transcript: string): Promise<AI> {
    try {
      const prompt = `
                You are an AI meeting assistant.

                Analyze the transcript and return ONLY valid JSON.

                FORMAT:
                {
                "summary": "max 5 sentences",
                "actions": ["action 1", "action 2"],
                "key_points": ["point 1", "point 2"]
                }

                Transcript:
                ${transcript}
            `

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      })

      const text = response.choices[0]?.message?.content || ''

      //Parse safely
      try {
        const parsed = JSON.parse(text)

        return {
          summary: parsed.summary || '',
          actions: parsed.actions || [],
          key_points: parsed.key_points || [],
        }
      } catch (parseError) {
        console.error('JSON Parse Error:', text)

        return {
          summary: '',
          actions: [],
          key_points: [],
        }
      }
    } catch (error: any) {
      console.error(' AI Service Error:', error.message)

      return {
        summary: '',
        actions: [],
        key_points: [],
      }
    }
  }
}

export default new AIService()
