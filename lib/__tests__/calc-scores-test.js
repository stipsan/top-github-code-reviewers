import calcScores from '../calc-scores'

const authors = [
  {
    avatarUrl: 'https://avatars0.githubusercontent.com/u/4331946?v=4',
    login: 'jgierer12',
  },
  {
    avatarUrl: 'https://avatars2.githubusercontent.com/u/81981?v=4',
    login: 'stipsan',
  },
]

const data = {
  edges: [
    {
      node: {
        reviews: {
          edges: [
            {
              node: {
                author: authors[0],
                body:
                  'Wouldn\'t it be easier to just always add them after the "Graphs" tab?',
                state: 'COMMENTED',
                comments: {
                  totalCount: 0,
                },
              },
            },
            {
              node: {
                author: authors[1],
                body: 'Whitespace issue only.',
                state: 'CHANGES_REQUESTED',
                comments: {
                  totalCount: 1,
                },
              },
            },
            {
              node: {
                author: authors[0],
                body: 'Did you test it?',
                state: 'COMMENTED',
                comments: {
                  totalCount: 0,
                },
              },
            },
          ],
        },
      },
    },
    {
      node: {
        reviews: {
          edges: [
            {
              node: {
                author: authors[0],
                body: 'Nice',
                state: 'DISMISSED',
                comments: {
                  totalCount: 0,
                },
              },
            },
            {
              node: {
                author: authors[1],
                body: '',
                state: 'PENDING',
                comments: {
                  totalCount: 0,
                },
              },
            },
            {
              node: {
                author: authors[0],
                body: '',
                state: 'APPROVED',
                comments: {
                  totalCount: 1,
                },
              },
            },
          ],
        },
      },
    },
  ],
}

it('should calculate scores', () => {
  expect(calcScores(data)).toMatchObject({
    topReviewers: [
      {
        author: authors[0],
        stats: {
          comments: 5,
          PENDING: 0,
          DISMISSED: 1,
          APPROVED: 1,
          CHANGES_REQUESTED: 0,
        },
        score: 5 + 5 + 10,
      },
      {
        author: authors[1],
        stats: {
          comments: 2,
          PENDING: 1,
          DISMISSED: 0,
          APPROVED: 0,
          CHANGES_REQUESTED: 1,
        },
        score: 2 + 2 + 10,
      },
    ],
  })
})
