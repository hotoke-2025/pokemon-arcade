import pokeAudio from '../../Pokémon Theme Song.mp3'
const pokesound = pokeAudio
function Audio() {
  return (
    <div className="mx-auto">
      <audio autoPlay muted loop controls src={pokesound}>
        <track
          kind="captions"
          src="captions.vtt"
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default Audio
