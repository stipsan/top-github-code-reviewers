import React from 'react'

const Rank = num => {
  if (num === 1) {
    return '🥇'
  }

  if (num === 2) {
    return '🥈'
  }

  if (num === 3) {
    return '🥉'
  }

  return num
}

export default props => {
  const { reviewer, width, height, index } = props

  const yTop = (index + 0.5) * 64
  const yBottom = (index + 1.5) * 64
  return (
    <g>
      <text
        fontSize={`${index < 3 ? '53' : '30'}`}
        fontWeight="900"
        fontFamily="Helvetica"
        fill="#ccc"
        textAnchor={`${index < 3 ? 'start' : 'middle'}`}
        x={`${index < 3 ? '10' : '36'}`}
        y={yTop + (index < 3 ? 49 : 46)}
      >
        {Rank(index + 1)}
      </text>
      <text fontSize="24" fill="#000" x="72" y={yTop + 42}>
        {reviewer.author.login}
      </text>

      <text
        fontFamily="Helvetica"
        fontSize="32px"
        fill="#586069"
        x={`${width - 32}`}
        y={yTop + 44}
        textAnchor="end"
      >
        {reviewer.score}
      </text>
      <path
        d={`M 0 ${yTop} h ${width}`}
        stroke="#EAECEF"
        strokeLinecap="square"
      />
    </g>
  )
}
