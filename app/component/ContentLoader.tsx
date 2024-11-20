import React from 'react';
import ContentLoader from 'react-content-loader';


export const Products = ({
  width = 1366,
  heading = { width: 140, height: 24 },
  row = 2,
  column = 5,
  padding = 12,
  borderRadius = 4,
  ...props
}) => {
  const list = []

  let height

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = (width - padding * (column + 1)) / column

      const x = padding + j * (itemWidth + padding)

      const height1 = itemWidth

      const height2 = 20

      const height3 = 20

      const space =
        padding + height1 + (padding / 2 + height2) + height3 + padding * 4

      const y1 = padding + heading.height + padding * 2 + space * (i - 1)

      const y2 = y1 + padding + height1

      const y3 = y2 + padding / 2 + height2

      list.push(
        <>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </>
      )

      if (i === row) {
        height = y3 + height3
      }
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...props}
    >
      {heading && (
        <rect
          x={padding}
          y={padding}
          rx={0}
          ry={0}
          width={heading.width}
          height={heading.height}
        />
      )}
      {list}
    </ContentLoader>
  )
}


export  const SingleProduct= () => {
  return (
    <ContentLoader viewBox="0 0 800 400" height={800} width={1330} >
      <circle cx="472" cy="159" r="7" />
      <rect x="487" y="154" rx="5" ry="5" width="220" height="10" />
      <circle cx="472" cy="190" r="7" />
      <rect x="487" y="184" rx="5" ry="5" width="220" height="10" />
      <circle cx="472" cy="219" r="7" />
      <rect x="487" y="214" rx="5" ry="5" width="220" height="10" />
      <circle cx="472" cy="249" r="7" />
      <rect x="487" y="244" rx="5" ry="5" width="220" height="10" />
      <rect x="64" y="18" rx="0" ry="0" width="346" height="300" />
      <rect x="229" y="300" rx="0" ry="0" width="0" height="0" />
      <rect x="111" y="340" rx="0" ry="0" width="0" height="0" />
      <rect x="121" y="342" rx="0" ry="0" width="0" height="0" />
      <rect x="10" y="20" rx="0" ry="0" width="40" height="44" />
      <rect x="10" y="80" rx="0" ry="0" width="40" height="44" />
      <rect x="10" y="140" rx="0" ry="0" width="40" height="44" />
      <rect x="194" y="329" rx="0" ry="0" width="0" height="0" />
      <rect x="192" y="323" rx="0" ry="0" width="0" height="0" />
      <rect x="185" y="323" rx="0" ry="0" width="0" height="0" />
      <rect x="10" y="200" rx="0" ry="0" width="40" height="44" />
      <rect x="470" y="18" rx="0" ry="0" width="300" height="25" />
      <rect x="470" y="58" rx="0" ry="0" width="300" height="6" />
      <rect x="470" y="68" rx="0" ry="0" width="300" height="6" />
      <rect x="470" y="78" rx="0" ry="0" width="300" height="6" />
      <rect x="798" y="135" rx="0" ry="0" width="0" height="0" />
      <rect x="731" y="132" rx="0" ry="0" width="0" height="0" />
      <rect x="470" y="99" rx="0" ry="0" width="70" height="30" />
      <rect x="560" y="99" rx="0" ry="0" width="70" height="30" />
    </ContentLoader>
  )
}

export const CartLoader=()=>{
return (
    <ContentLoader
      speed={2}
      width={400}
      height={150}
      viewBox="0 0 400 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
 
    >
      <rect x="35" y="10" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="45" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="80" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="115" rx="5" ry="5" width="150" height="10" />
      <rect x="3" y="5" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="40" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="75" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="110" rx="4" ry="4" width="20" height="20" />
    </ContentLoader>
)
  
}