import React from 'react'

const Position = ({ num }) => {
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

  const yTop = (index + 1) * 64
  const yBottom = (index + 2) * 64
  return (
    <g>
      <path
        d={`M 0 ${yTop} h ${width}`}
        stroke="#EAECEF"
        stroke-linecap="square"
      />
      <text fontSize="24" fill="#000" x="96" y={yTop + 32}>
        {reviewer.author.login}
      </text>
    </g>
  )
}
