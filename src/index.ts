const pattern = /[^|&()]+/g

/**
 * 解析字符串 "a && (b || c)"，并返回最终的结果
 * @param template 模板字符串，支持 `&&` 或 `&`，表示逻辑与；也支持 `||` 或 `|`，表示逻辑或；默认逻辑与的优先级比逻辑或高，但可以使用 `()` 调整
 * @param is
 */
export function parse(template: string, is: (key: string) => boolean): boolean {
  // 生成一个只包含 true 和 false 的表达式，如 "true & (true | false)"
  const expression = template.replace(pattern, (r) => {
    const key = r.trim()
    if (!key) return '' // 有可能是在两个标签之间，如 `( a || b ) && c` 中 ")" 和 "&&" 之间也会匹配成功
    if (key.startsWith('!')) {
      const nextKey = key.substring(1)
      if (!nextKey) return `false`
      return `${!is(nextKey)}`
    }
    return `${!!is(key)}`
  })
  try {
    return (new Function(`return ${expression}`))()
  } catch (e) {
    throw new Error(`Unexpected transform "${template}" => "${expression}"`)
  }
}
