// import { Link } from 'react-router'
// function Home() {
//   return (
//     <>
//       <h1 className="m-8 text-center text-2xl font-bold">
//         Choose a game to play!
//       </h1>
//       <div className="vertical-phone" >
//         <div className="flex justify-center space-x-32">
//           <Link to="/game-1">
//             <p className="whitespace-nowrap">Pokemon Battle</p>
//           </Link>
//           <Link to="/game-2">
//             <p className="mx-auto whitespace-nowrap">Who&apos;s that Pokemon!</p>
//           </Link>
//           <Link to="/game-3">
//             <p className="whitespace-nowrap"> Tic-Tac-Johto</p>
//           </Link>
//         </div>
//         <div className="mt-8 flex flex-nowrap justify-center space-x-8">
//           <Link to="/game-1" className="inline-block w-64 flex-none">
//             <img
//               className="h-full w-full"
//               src="/images/Game1.png"
//               alt="Game1 - Pokemon Battle"
//             />
//           </Link>
//           <Link to="/game-2" className="inline-block w-64 flex-none">
//             <img
//               className="w-full"
//               src="/images/WTP.png"
//               alt="Game2 - Who's that Pokemon!"
//             />
//           </Link>
//           <Link to="/game-3" className="inline-block w-64 flex-none">
//             <img
//               className="w-full"
//               src="/images/Game3.png"
//               alt="Game3 - Tic-Tac-Johto"
//             />
//           </Link>
//         </div>
//       </div> 
//     </>
//   )
// }

// export default Home

import { Link } from 'react-router'

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-12 px-4">
      <h1 className="mb-8 text-center text-2xl font-bold">
        Choose a game to play!
      </h1>

      <div className="flex flex-col items-center space-y-8 sm:space-y-12 md:space-y-0 md:space-x-8 md:flex-row">
        <Link to="/game-1" className="w-full max-w-xs md:w-64">
          <img
            className="w-full h-auto object-contain"
            src="/images/Game1.png"
            alt="Game1 - Pokemon Battle"
          />
          <p className="mt-2 text-center whitespace-nowrap">Pokemon Battle</p>
        </Link>

        <Link to="/game-2" className="w-full max-w-xs md:w-64">
          <img
            className="w-full h-auto object-contain"
            src="/images/WTP.png"
            alt="Game2 - Who's that Pokemon!"
          />
          <p className="mt-2 text-center whitespace-nowrap">
            Who&apos;s that Pokemon!
          </p>
        </Link>

        <Link to="/game-3" className="w-full max-w-xs md:w-64">
          <img
            className="w-full h-auto object-contain"
            src="/images/Game3.png"
            alt="Game3 - Tic-Tac-Johto"
          />
          <p className="mt-2 text-center whitespace-nowrap">Tic-Tac-Johto</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
