import ting from 'assets/audio/ting.mp3'

export function alertNotifications(){
  const audio = new Audio(ting)
  audio.play()
}