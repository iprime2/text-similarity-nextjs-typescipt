import { NextResponse } from 'next/server'
import axios from 'axios'
import { z } from 'zod'
import { withMethods } from '@/lib/api-middleware/with-methods'
import { NextApiRequest, NextApiResponse } from 'next'

// const reqSchema = z.object({
//   firstText: z.string().max(1000),
//   secondText: z.string().max(1000),
// })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req
    console.log(req.body)

    const { firstText, secondText } = body

    const options = {
      method: 'GET',
      url: 'https://text-similarity-calculator.p.rapidapi.com/stringcalculator.php',
      params: {
        ftext: firstText,
        stext: secondText,
      },
      headers: {
        'X-RapidAPI-Key': 'bb83d47e46mshd007e32b6e5f20fp17a5e7jsn2f87c47a0e3c',
        'X-RapidAPI-Host': 'text-similarity-calculator.p.rapidapi.com',
      },
    }

    const response = await axios.request(options)

    const percentage = response?.data?.percentage

    return res.json({ percentage: percentage, status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }
    return res.json({ error: 'Internal server error', status: 500 })
  }
}

export default withMethods(['POST'], handler)
