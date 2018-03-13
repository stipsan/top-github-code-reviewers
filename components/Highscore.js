const Rank = num => {
  if (num === 1) {
    return "🥇";
  }

  if (num === 2) {
    return "🥈";
  }

  if (num === 3) {
    return "🥉";
  }

  return num;
};

export default props => {
  const { reviewer, width, height, index, avatarUrl } = props;

  const yTop = (index + 0.5) * 64;
  const yBottom = (index + 1.5) * 64;

  const avatarId = `avatar-${reviewer.author.login}`;
  return (
    <g>
      <text
        fontSize={`${index < 3 ? "53" : "30"}`}
        fontWeight="600"
        fill="#ccc"
        textAnchor={`${index < 3 ? "start" : "middle"}`}
        x={`${index < 3 ? "10" : "36"}`}
        y={yTop + (index < 3 ? 49 : 46)}
      >
        {Rank(index + 1)}
      </text>
      <clipPath id={avatarId}>
        <rect x="74" y={yTop + 10} width="44px" height="44px" rx="5" />
      </clipPath>
      <image
        xlinkHref={avatarUrl || reviewer.author.avatarUrl}
        clipPath={`url(#${avatarId})`}
        x="74"
        y={yTop + 10}
        height="44px"
        width="44px"
      />
      <text fontSize="24" fill="#000" x="128" y={yTop + 42}>
        {reviewer.author.login}
      </text>

      <text
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
  );
};
