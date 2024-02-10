
interface PropTypes extends React.HTMLAttributes<SVGElement> {
  height: number;
  width: number;
  data: [number, number][];
}

const SparkChart = ({
  height,
  width,
  data,
  ...props
}: PropTypes) => {
  const points = data.map((point) => point.join(',')).join(' ');

  return (
    <svg width={width} height={height}{...props}>
      <defs>
        <linearGradient
          id="gradient-735635407"
          x1="0"
          x2="0"
          y1="0"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="currentColor"
            opacity={0.25}
          ></stop>
          <stop
            offset="10%"
            stopColor="currentColor"
            opacity={0.50}
          ></stop>
          <stop
            offset="25%"
            stopColor="currentColor"
            opacity={0.75}
          ></stop>
          <stop
            offset="50%"
            stopColor="currentColor"
            opacity={1}
          ></stop>
        </linearGradient>
        <mask
          id="sparkline-735635407"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <polyline
            transform={`translate(0, ${height}) scale(1,-1)`}
            fill="transparent"
            strokeWidth="4"
            stroke="white"
            points={points}
          >
          </polyline>
        </mask>
      </defs>
      <g transform="translate(0, 2.0)">
        <rect 
          x="0" 
          y="-2"
          width={width}
          height={height}
          fill="url(#gradient-735635407)"
          mask="url(#sparkline-735635407)"
        >
        </rect>
      </g>
    </svg>
  );
};

export default SparkChart;
