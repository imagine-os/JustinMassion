/* Shared atmosphere photos for every JustinMassion.com concept.
   Free-license Unsplash photos (images.unsplash.com, not Unsplash+), hotlinked through Unsplash's image CDN
   as Unsplash recommends. Use these for backgrounds/atmosphere; keep Justin's own project images for showing the work.
   Usage: STOCK.url('guatape', 1920)  ->  sized, cropped, auto-format URL. Add new keys here for upcoming concepts. */
(() => {
  const P = {
    guatape:        'photo-1598028060898-c117093edfcb', // aerial lake + islands, Guatapé
    guatapeRock:    'photo-1764815685159-b3b5b371a687', // El Peñol with its stairs and colourful buildings
    guatapeStreet:  'photo-1775584989108-835121fd7e21', // colourful stairs in town
    guatapeIslands: 'photo-1525088299396-2417f1366edd', // islands from above
    arcade:         'photo-1759171053256-bf1b480a310a', // neon arcade row
    arcade2:        'photo-1511512578047-dfb367046420', // arcade cabinets in the dark
    chameleon:      'photo-1778666497261-849a2a4d2eeb', // turquoise chameleon
    chameleonEye:   'photo-1570116909750-1ccde6be780a', // chameleon close-up
    clouds:         'photo-1501630834273-4b5604d2ee31', // pastel clouds
    cloudSea:       'photo-1499346030926-9a72daac6c63', // sea of clouds
    palms:          'photo-1502759683299-cdcd6974244f', // orange sunset palms
    palms2:         'photo-1523595857-fe9ee689f76f',    // palm silhouettes at dusk
    neon:           'photo-1765718826790-909aa08ac771', // neon city at night
    neonAlley:      'photo-1534214526114-0ea4d47b04f2', // lantern alley
    ocean:          'photo-1524275804141-5e9f2bc5a71d', // deep blue ocean from above
    la:             'photo-1580655653885-65763b2597d0', // LA palms at sunset
    laNight:        'photo-1444723121867-7a241cacace9', // LA at night
    orlando:        'photo-1605723517503-3cadb5818a0c'  // Orlando skyline with palms
  };
  window.STOCK = {
    ids: P,
    url(key, w = 1920, q = 80) { const id = P[key] || key; return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`; },
    credit: 'Atmosphere photos: Unsplash'
  };
})();
