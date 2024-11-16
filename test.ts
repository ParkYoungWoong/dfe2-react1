interface A {
  x: number
  hello: () => Promise<number>
}

async function hello() {
  return 123
}

const a = {
  x: 123,
  hello
}

// hello() // undefined
hello() // promise
