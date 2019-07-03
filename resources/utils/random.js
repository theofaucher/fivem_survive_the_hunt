// Récup depuis https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random

// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (exclue).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
exports("getRandomInt",(min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
})

// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
exports("getRandomIntInclusive", (min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  })

exports("getRandomArbitrary", (min, max)=>{
    return Math.random() * (max - min) + min;
})