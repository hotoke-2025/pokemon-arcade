
interface Mon {
  id: number
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
  const image =
'https://media.tenor.com/UZJd1pjj4NMAAAAe/surprised-pikachu.png'

  return (
    <>
      <div>
        {mons.map(
          (mon) =>
            (
              <img
                key={mon.id}
                alt={mon.id}
                style={{
                  top: `${String(mon.top)}px`,
                  left: `${String(mon.left)}px`,
                  width: '4%',
                  position: 'absolute',
                }}
                src={image}
              ></img>
            ),
        )}
      </div>
    </>
  )
}

export default Mons
