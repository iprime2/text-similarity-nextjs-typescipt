import { cosineSimilarity } from '@/helpers/cosine-similarity'
import { withMethods } from '@/lib/api-middleware/with-methods'
import { db } from '@/lib/db'
import { openai } from '@/lib/openai'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import axios from 'axios'

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown

  const apiKey = req.headers.authorization
  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { text1, text2 } = reqSchema.parse(body)

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    })

    if (!validApiKey) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const start = new Date()

    // const embeddings = await Promise.all(
    //   [text1, text2].map(async (text) => {
    //     console.log(text)
    //     const res = await openai.createEmbedding({
    //       model: 'text-embedding-ada-002',
    //       input: text,
    //     })

    //     return res.data.data[0].embedding
    //   })
    // )

    // const similarity = cosineSimilarity(embeddings[0], embeddings[1])

    //rapid api

    const options = {
      method: 'GET',
      url: 'https://text-similarity-calculator.p.rapidapi.com/stringcalculator.php',
      params: {
        ftext: text1,
        stext: text2,
      },
      headers: {
        'X-RapidAPI-Key': 'bb83d47e46mshd007e32b6e5f20fp17a5e7jsn2f87c47a0e3c',
        'X-RapidAPI-Host': 'text-similarity-calculator.p.rapidapi.com',
      },
    }

    const response = await axios.request(options)

    const duration = new Date().getTime() - start.getTime()

    // Persist request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    })

    // if (!response?.percentage) {
    //   return res.status(401).json({ error: 'No Response' })
    // }

    const percentage = response?.data?.percentage

    return res
      .status(200)
      .json({ success: true, text1, text2, percentage: percentage })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }

    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withMethods(['POST'], handler)
