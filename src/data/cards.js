const CARD_FILES = [
  '01_Apache.jpg',
  '02_Ojo.jpg',
  '03_Tambor.jpg',
  '04_Mundo.jpg',
  '05_Palma.jpg',
  '06_Bandolon.jpg',
  '07_Boracho.jpg',
  '08_Rosa.jpg',
  '09_Pino.jpg',
  '10_Camaron.jpg',
  '11_Pera.jpg',
  '12_Arpa.jpg',
  '13_Garza.jpg',
  '14_Musico.jpg',
  '15_Arbol.jpg',
  '16_Botella.jpg',
  '17_Cotorro.jpg',
  '18_Estrella.jpg',
  '19_Negrito.jpg',
  '20_Gorrito.jpg',
  '21_Barril.jpg',
  '22_Melon.jpg',
  '23_Campana.jpg',
  '24_Diablito.jpg',
  '25_Mano.jpg',
  '26_Cantarito.jpg',
  '27_Nopal.jpg',
  '28_Sandia.jpg',
  '29_Venado.jpg',
  '30_Alacran.jpg',
  '31_Luna.jpg',
  '32_Sol.jpg',
  '33_Calavera.jpg',
  '34_Muerte.jpg',
  '35_Serena.jpg',
  '36_Dama.jpg',
  '37_Catrin.jpg',
  '38_Chalupa.jpg',
  '39_Arana.jpg',
  '40_Jaras.jpg',
  '41_Bota.jpg',
  '42_Soldado.jpg',
  '43_Violoncello.jpg',
  '44_Bandera.jpg',
  '45_Cazo.jpg',
  '46_Valiente.jpg',
  '47_Pajaro.jpg',
  '48_Maceta.jpg',
  '49_Gallo.jpg',
  '50_Rana.jpg',
  '51_Corona.jpg',
  '52_Paraguas.jpg',
  '53_Corazon.jpg',
  '54_Pescado.jpg',
  '55_Axolotl.jpg',
  '56_NoaNoa.jpg',
  '57_CerroPelon.jpg',
]

export const TITLE_CARD = '/cards/00.jpg'

export const CARDS = CARD_FILES.map((file) => {
  const name = file.replace(/^\d+_/, '').replace(/\.jpg$/, '')
  return {
    id: file,
    src: `/cards/${file}`,
    label: name.replace(/([a-z])([A-Z])/g, '$1 $2'),
  }
})

export function shuffledDeck() {
  const deck = [...CARDS]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}
