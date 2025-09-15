import { usePokedex } from '../hooks/usePokedex'

export default function Pokedex() {
  const { data: pokemons, isLoadingProperties, isErrorProperties, error } = usePokedex()

  if (isLoadingProperties) return <p>Loading...</p>
  if (isErrorProperties) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemons?.map((pokemon: { id: number; name: string; nickname?: string }) => (
          <li key={pokemon.id}>
            {pokemon.name} {pokemon.nickname ? `(${pokemon.nickname})` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}


// import { type Pokemon } from '../../models/pokemonList.ts'
// import { useState, FormEvent, ChangeEvent } from 'react'
// import { useAddPokemon } from '../hooks/usePokedex.ts'


// const empty = {
//   id: '',
//   name: '',
//   // nickname: '',
//   // released: '',
//   // userId: '',
// } as unknown as Pokemon

// export default function AddNewPokemon() {
//   const addAPokemon = useAddPokemon()
//   const [formState, setFormState] = useState(empty)

//   async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
//     evt.preventDefault()

//     if (addAPokemon.isPending) {
//       return
//     }

//     const data = {
//       id: formState.id,
//       name: formState.name,
//       // not in type Pokemon (in models)
//       //nickname: formState.nickname,
//       // released: formState.released,
//       // user_id: formState.userId,
//     }

//     const newPokemon = await addAPokemon.mutateAsync(data)
//     console.log('add a pokemon', newPokemon)
//     setFormState(empty)
//   }

//   function handleChange(evt: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = evt.currentTarget

//     setFormState((prev) => ({ ...prev, [name]: value }))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <div className="form-item">
//         <label htmlFor="id">Id: </label>
//         <input
//           name="id"
//           id="id"
//           value={formState.id}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-item">
//         <label htmlFor="name">Name: </label>
//         <input
//           name="name"
//           id="name"
//           value={formState.name}
//           onChange={handleChange}
//         />
//       </div>
//       {/* <div className="form-item">
//         <label htmlFor="nickname">Nickname: </label>
//         <input
//           name="nickname"
//           id="nickname"
//           value={formState.nickname}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-item">
//         <label className="released" htmlFor="item">Caught: </label>
//         <input
//           name="released"
//           id="released"
//           value={formState.released}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-item">
//         <label className="userId" htmlFor="item">User Id: </label>
//         <input
//           name="userId"
//           id="userId"
//           value={formState.userId}
//           onChange={handleChange}
//         />
//       </div> */}
//       <button data-pending={addAPokemon.isPending}>Submit</button>
//     </form>
//   )
// }
