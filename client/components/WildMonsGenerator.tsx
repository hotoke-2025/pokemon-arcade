interface Mon {
  id: number //spawn location id
  monId: number //pokemon pokedex id
  top: number
  left: number
}

interface Props {
  mons: Mon[]
  setMons: (mons: Mon[]) => React.Dispatch<
    React.SetStateAction<
      {
        id: number
        top: number
        left: number
      }[]
    >
  >
}

function Mons({ mons, setMons }: Props) {
 
  return (
    <>
      {mons.map((mon) => (
        <div
          key={mon.id}
          style={{
            position: 'absolute',
            top: `${mon.top}px`,
            left: `${mon.left}px`,
            width: '40px',
            height: '40px',
            background: 'transparent', // invisible
          }}
        />
      ))}
    </>
  )
}

export default Mons
