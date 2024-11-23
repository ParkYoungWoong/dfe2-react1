function add<xType, yType>(x: xType, y: yType, z: xType) {
  // @ts-ignore
  return x + y
}

interface Movie {
  title: string
  poster: string
}

add(1, '2', 3)
// add<Movie>({ title: 'Joker', poster: '' }, 2) // 3
// add('1', '2') // '12'
// add(false, true)
// add<string>(1, '2')
// add<boolean>(true, false)
// add<undefined>(undefined, undefined)
