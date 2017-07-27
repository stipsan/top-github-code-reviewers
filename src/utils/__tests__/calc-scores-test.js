import calcScores from '../calc-scores'

const data = {
  edges: [
    {
      node: {
        reviews: {
          edges: [
            {
              node: {
                author: {
                  avatarUrl:
                    'https://avatars0.githubusercontent.com/u/4331946?v=4',
                  login: 'jgierer12',
                },
                body:
                  'Wouldn\'t it be easier to just always add them after the "Graphs" tab?',
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
  ],
}

it('should calculate scores', () => {
  expect(calcScores(data)).toMatchObject({
    topReviewers: [
      {
        author: {
          avatarUrl:
            'https://avatars0.githubusercontent.com/u/4331946?v=4',
          login: 'jgierer12',
        },
        stats: {
          comments: 1,
          PENDING: 0,
          DISMISSED: 0,
          APPROVED: 0,
          CHANGES_REQUESTED: 0,
        },
        score: 1
      }
    ]
  })
})
