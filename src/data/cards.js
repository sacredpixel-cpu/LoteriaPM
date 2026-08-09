const CARD_FILES = [
  ['01_Apache', 'El Apache'],
  ['02_Ojo', 'El Ojo de Agua'],
  ['03_Tambor', 'El Tambor'],
  ['04_Mundo', 'El Mundo'],
  ['05_Palma', 'La Palma'],
  ['06_Bandolon', 'El Bandolón'],
  ['07_Boracho', 'El Boracho'],
  ['08_Rosa', 'La Rosa'],
  ['09_Pino', 'El Pino'],
  ['10_Camaron', 'El Camarón'],
  ['11_Pera', 'La Pera'],
  ['12_Arpa', 'El Arpa'],
  ['13_Garza', 'La Garza'],
  ['14_Musico', 'El Músico'],
  ['15_Arbol', 'El Árbol'],
  ['16_Botella', 'La Botella'],
  ['17_Cotorro', 'El Cotorro'],
  ['18_Estrella', 'La Estrella'],
  ['19_Negrito', 'El Negrito'],
  ['20_Gorrito', 'El Gorrito'],
  ['21_Barril', 'El Barril'],
  ['22_Melon', 'El Melón'],
  ['23_Campana', 'La Campana'],
  ['24_Diablito', 'El Diablito'],
  ['25_Mano', 'La Mano'],
  ['26_Cantarito', 'El Cantarito'],
  ['27_Nopal', 'El Nopal'],
  ['28_Sandia', 'La Sandía'],
  ['29_Venado', 'El Venado'],
  ['30_Alacran', 'El Alacrán'],
  ['31_Luna', 'La Luna'],
  ['32_Sol', 'El Sol'],
  ['33_Calavera', 'La Calavera'],
  ['34_Muerte', 'La Muerte'],
  ['35_Serena', 'La Sirena'],
  ['36_Dama', 'La Dama'],
  ['37_Catrin', 'El Catrín'],
  ['38_Chalupa', 'La Chalupa'],
  ['39_Arana', 'La Araña'],
  ['40_Jaras', 'Las Jaras'],
  ['41_Bota', 'La Bota'],
  ['42_Soldado', 'El Soldado'],
  ['43_Violoncello', 'El Violoncello'],
  ['44_Bandera', 'La Bandera'],
  ['45_Cazo', 'El Cazo'],
  ['46_Valiente', 'El Valiente'],
  ['47_Pajaro', 'El Pájaro'],
  ['48_Maceta', 'La Maceta'],
  ['49_Gallo', 'El Gallo'],
  ['50_Rana', 'La Rana'],
  ['51_Corona', 'La Corona'],
  ['52_Paraguas', 'El Paraguas'],
  ['53_Corazon', 'El Corazón'],
  ['54_Pescado', 'El Pescado'],
  ['55_Axolotl', 'El Axolotl'],
  ['56_NoaNoa', 'El Noa Noa'],
  ['57_CerroPelon', 'El Cerro Pelón'],
]

export const TITLE_CARD = '/cards/00.jpg'

export const CARDS = CARD_FILES.map(([file, label]) => ({
  id: file,
  src: `/cards/${file}.jpg`,
  audio: `/audio/${file}.m4a`,
  label,
}))

export function shuffledDeck() {
  const deck = [...CARDS]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}
