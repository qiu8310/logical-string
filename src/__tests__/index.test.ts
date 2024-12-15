import { parse } from '../index.js'

// ES Module 中如果想用全局的 jest 变量，参考：
// https://jestjs.io/docs/ecmascript-modules#differences-between-esm-and-commonjs
// const globalJest = (import.meta as any).jest as typeof jest
// const jest = globalJest

describe('parse', () => {

  const is = (n: string) => [ 'a', 'e', 'i', 'o', 'u' ].some(k => n.includes(k))
  it('logic 1', () => {
    expect(parse('a', is)).toBe(true)
    expect(parse('b', is)).toBe(false)
  })
  it('logic 2', () => {
    expect(parse('( a || b )', is)).toBe(true)
    expect(parse('a || b', is)).toBe(true)
    expect(parse('( a && b )', is)).toBe(false)
    expect(parse('a && b', is)).toBe(false)
  })

  it('logic 3', () => {
    expect(parse('c && ( a || b )', is)).toBe(false)
    expect(parse('( a || b ) && c', is)).toBe(false)
  })

  it('logic 4', () => {
    expect(parse('!', is)).toBe(false)
    expect(parse('!a', is)).toBe(false)
    expect(parse('!b', is)).toBe(true)
    expect(parse('( !a || !b ) && !c', is)).toBe(true)
  })

  it('error', () => {
    expect(() => {
      parse('a ( c', is)
    }).toThrowErrorMatchingInlineSnapshot(`"Unexpected transform "a ( c" => "true(false""`)
  })
})
