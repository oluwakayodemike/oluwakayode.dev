// hand-drawn style diagram for the local-first article. pure svg, themed via currentcolor.
export function LocalFirstDiagram() {
  return (
    <figure className="my-10" aria-labelledby="local-first-diagram-title">
      <svg
        viewBox="0 0 640 300"
        className="h-auto w-full text-foreground"
        role="img"
        aria-label="Diagram: your data lives on your device and still works offline; it syncs a copy to the cloud when you are online."
        aria-describedby="local-first-diagram-desc"
      >
        <title id="local-first-diagram-title">How local-first data flows</title>

        {/* device box: slightly wobbly rectangle */}
        <path
          d="M62 88 C 60 120, 64 180, 62 226 C 100 229, 200 227, 246 225 C 248 180, 246 120, 247 89 C 190 86, 110 90, 62 88 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.95"
        />
        <text
          x="154"
          y="118"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="15"
          opacity="1"
        >
          this device
        </text>
        {/* little file lines inside the device */}
        <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6">
          <path d="M92 142 C 120 141, 180 143, 214 142" fill="none" />
          <path d="M94 160 C 130 161, 170 159, 200 160" fill="none" />
          <path d="M92 178 C 115 177, 165 179, 210 178" fill="none" />
        </g>
        <text
          x="154"
          y="210"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="12"
          opacity="0.8"
        >
          your data lives here
        </text>

        {/* cloud: lumpy hand-drawn blob */}
        <path
          d="M420 130 C 412 108, 430 92, 452 96 C 460 76, 492 72, 506 88 C 528 78, 552 94, 548 114 C 566 120, 566 146, 548 152 C 540 168, 508 170, 496 158 C 476 170, 444 164, 440 148 C 424 148, 416 140, 420 130 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.95"
        />
        <text
          x="492"
          y="130"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="15"
          opacity="1"
        >
          the cloud
        </text>
        <text
          x="492"
          y="196"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="12"
          opacity="0.8"
        >
          a copy, when you want one
        </text>

        {/* sync arrows: dashed, slightly curved, both directions */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="7 7"
          opacity="0.9"
        >
          <path d="M252 118 C 300 104, 350 100, 406 106" />
          <path d="M406 176 C 356 186, 306 188, 252 180" />
        </g>
        {/* arrowheads */}
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
          <path d="M394 98 L 408 106 L 396 116" />
          <path d="M264 190 L 250 181 L 262 170" />
        </g>
        <text
          x="330"
          y="92"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="12"
          opacity="0.8"
        >
          syncs when online
        </text>
        <text
          x="330"
          y="206"
          textAnchor="middle"
          className="fill-current font-mono"
          fontSize="12"
          opacity="0.8"
        >
          and back again
        </text>

        {/* offline note under the device */}
        <g opacity="0.95">
          <path
            d="M80 258 C 120 262, 190 260, 228 257"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <text
            x="154"
            y="282"
            textAnchor="middle"
            className="fill-current font-mono"
            fontSize="12"
            opacity="0.8"
          >
            offline? everything here still works
          </text>
        </g>
      </svg>
      <p id="local-first-diagram-desc" className="sr-only">
        A hand-drawn diagram with two parts. On the left, a box labelled "this device" holds your
        data: notes, files, and photos, with a note that your data lives here. On the right, a cloud
        shape labelled "the cloud" holds a copy, when you want one. Two dashed arrows run between
        them: one from the device to the cloud labelled "syncs when online", and one back from the
        cloud to the device labelled "and back again". Below the device, a final note reads:
        offline? everything here still works. The point of the diagram is that your device is the
        home of your data, so it stays available and fast even without a connection, while the cloud
        only receives a synced copy when you are online.
      </p>
      <figcaption className="mt-3 text-center font-mono text-[0.75rem] text-muted-foreground">
        local-first in one picture: the device is the home, the cloud is a guest.
      </figcaption>
    </figure>
  );
}
