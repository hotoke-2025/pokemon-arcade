import pokeAudio from '../../Pokémon Theme Song.mp3'
const pokesound = pokeAudio
function MyAudioPlayer() {
      return (
        <div className='mx-auto'>
          <audio controls src={pokesound}>
        </audio>
        </div>

      );
    };

    export default MyAudioPlayer;