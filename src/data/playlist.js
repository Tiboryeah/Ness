export const TRACK_METADATA = {
  laley: { title: 'El Duelo', artist: 'La Ley', url: '/music/la_ley_el_duelo.mp3' },
  cafetacvba: { title: 'Eres', artist: 'Café Tacvba', url: '/music/cafe_tacvba_eres.mp3' },
  deftones: { title: 'Be Quiet And Drive (Far Away)', artist: 'Deftones', url: '/music/deftones_be_quiet_and_drive.mp3' },
  sektacore: { title: 'El Fantasma de la Rana', artist: 'La Sekta Core', url: '/music/sekta_core_fantasma_de_la_rana.mp3' },
  interpol: { title: 'Evil', artist: 'Interpol', url: '/music/interpol_evil.mp3' },
  maldita: { title: 'Kumbala', artist: 'Maldita Vecindad', url: '/music/maldita_vecindad_kumbala.mp3' },
  mecano: { title: 'La Fuerza del Destino', artist: 'Mecano', url: '/music/mecano_la_fuerza_del_destino.mp3' },
  tijuanano: { title: 'Pobre De Tí', artist: 'Tijuana No!', url: '/music/tijuana_no_pobre_de_ti.mp3' },
  loveofmylife: { title: 'Love of My Life', artist: 'Queen', url: '/love_of_my_life.mp3' },
  secret: { title: 'A Little Piece of Heaven', artist: 'Avenged Sevenfold', url: '/music/avenged_a_little_piece_of_heaven.mp3' }
};

export const PLAYLIST_KEYS = Object.keys(TRACK_METADATA).filter((key) => key !== 'secret');

