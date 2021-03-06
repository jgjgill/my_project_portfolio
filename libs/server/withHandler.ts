import { NextApiRequest, NextApiResponse } from 'next'

export interface ResponseType {
  ok: boolean
  [key: string]: any
}

type method = 'GET' | 'POST' | 'DELETE'

interface ConfigType {
  methods: method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => void
  isPrivate?: boolean
}

const withHandler = ({ methods, handler, isPrivate = false }: ConfigType) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end()
    }

    if (isPrivate && !req.session.user) {
      return res.json({ ok: false, error: 'Please Login' })
    }

    try {
      await handler(req, res)
    } catch (err) {
      return res.status(500).json({ err })
    }

    return null
  }
}

export default withHandler
