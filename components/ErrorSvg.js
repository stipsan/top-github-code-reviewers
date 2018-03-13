export default ({ error }) => (
  <svg
    width="500px"
    height="40px"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 40"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g fontFamily="Helvetica" fontSize="12">
      <text x={0} y={28}>
        {error}
      </text>
    </g>
  </svg>
);
