// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client ({
  auth: process.env.NOTION_API_KEY
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, number, cpf } = req.body
  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID || '',
    },
    properties: {
      name: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name
            }
          }
        ]
      },
      email: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: email
            }
          }
        ]
      },
      number: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: number
            }
          }
        ]
      },
      cpf: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: cpf
            }
          }
        ]
      }
    }
  }).then(()=> {
    res.status(201).json({message:'Sucess!'})
  }).catch((error) => {
    console.log(error)
    res.status(500).json({message:'É, não foi dessa vez que você conseguiu, mas não desista, tente somente durante a execução do programa, tá? Valeu!'})
  })
}
